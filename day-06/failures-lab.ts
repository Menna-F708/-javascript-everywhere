 
 // failures-lab.ts — every way a request can go wrong.
 // Keep the Task API running with: npm run api

type AttemptWork = () => Promise<string>;

async function attempt(
  label: string,
  work: AttemptWork,
): Promise<void> {
  try {
    console.log(`✓ ${label.padEnd(26)} ${await work()}`);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));

    const cause = error as Error & {
      cause?: { code?: string };
    };

    const code = cause.cause?.code;

    console.log(
      `✗ ${label.padEnd(26)} ${error.name}: ${error.message}` +
        (code ? ` (${code})` : ""),
    );
  }
}

const API = "http://localhost:3000";
const mode = process.env.LAB_MODE ?? "normal";

// Read the server's own error message.
async function serverMessage(res: Response): Promise<string> {
  const body: unknown = await res.json();

  if (typeof body === "object" && body !== null) {
    const record = body as Record<string, unknown>;

    if (typeof record.error === "string") {
      return record.error;
    }

    if (typeof record.message === "string") {
      return record.message;
    }
  }

  return res.statusText || "Unknown server error";
}

// Runtime guard for one Task object.
function isTask(value: unknown): boolean {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const task = value as Record<string, unknown>;

  return (
    typeof task.id === "number" &&
    typeof task.title === "string" &&
    typeof task.completed === "boolean"
  );
}

async function runNormalMode(): Promise<void> {
  // 1. NETWORK — wrong port.
  await attempt("network: wrong port", async () => {
    const res = await fetch("http://localhost:3999/api/tasks");
    return String(res.status);
  });

  // 2. NETWORK — invalid hostname.
  await attempt("network: bad host", async () => {
    const res = await fetch("https://no-such-host.invalid/");
    return String(res.status);
  });

  // 3. HTTP 404 — intentionally do not check res.ok.
  await attempt("http 404, unchecked", async () => {
    const res = await fetch(`${API}/api/tasks/99999`);
    return `status ${res.status} — and no error was thrown`;
  });

  // 4. HTTP 400 — check res.ok and report the server message.
  await attempt("http 400, checked", async () => {
    const res = await fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "" }),
    });

    if (!res.ok) {
      const message = await serverMessage(res);
      throw new Error(`${res.status} — ${message}`);
    }

    return "created";
  });

  // 5. PARSE — the root route is expected to return HTML, not JSON.
  await attempt("parse: HTML, not JSON", async () => {
    const res = await fetch(`${API}/`);
    const data: unknown = await res.json();
    return JSON.stringify(data);
  });

  // 6. SHAPE — valid JSON, but not a single Task object.
  await attempt("shape: invalid Task", async () => {
    const res = await fetch(`${API}/api/tasks`);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data: unknown = await res.json();

    if (!isTask(data)) {
      throw new Error(
        "Response is valid JSON, but not a valid single Task",
      );
    }

    return "valid Task";
  });

  // 7. ABORT — cancel the request ourselves.
  await attempt("aborted by us", async () => {
    const controller = new AbortController();

    const pending = fetch(`${API}/api/tasks`, {
      signal: controller.signal,
    });

    controller.abort();

    const res = await pending;
    return String(res.status);
  });

  // 8. STALE — cancel the first load and use only the latest result.
  let activeController: AbortController | undefined;

  async function loadTasks(label: string): Promise<string> {
    activeController?.abort();

    const controller = new AbortController();
    activeController = controller;

    try {
      const res = await fetch(`${API}/api/tasks`, {
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: unknown = await res.json();

      if (activeController !== controller) {
        return `${label}: stale result ignored`;
      }

      return `${label}: latest result used`;
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        return `${label}: cancelled; result not used`;
      }

      throw err;
    }
  }

  await attempt("stale: latest load wins", async () => {
    const firstLoad = loadTasks("first");
    const secondLoad = loadTasks("second");

    const [first, second] = await Promise.all([
      firstLoad,
      secondLoad,
    ]);

    return `${first}; ${second}`;
  });
}

async function run500Mode(): Promise<void> {
  // Start the API with FAIL_RATE=1 before running this mode.
  await attempt("http 500, checked", async () => {
    const res = await fetch(`${API}/api/tasks`);

    if (!res.ok) {
      const message = await serverMessage(res);
      throw new Error(`${res.status} — ${message}`);
    }

    return "success";
  });
}

async function runTimeoutMode(): Promise<void> {
  // Start the API with SLOW=3000 before running this mode.
  await attempt("timeout: 1ms", async () => {
    const res = await fetch(`${API}/api/tasks`, {
      signal: AbortSignal.timeout(1),
    });

    return String(res.status);
  });
}

async function main(): Promise<void> {
  if (mode === "500") {
    await run500Mode();
    return;
  }

  if (mode === "timeout") {
    await runTimeoutMode();
    return;
  }

  await runNormalMode();
}

 main().catch(console.error);

// 16.2 — FAILURE CLASSIFICATION
//
// Failure               | Layer          | Does fetch reject? | Safe to retry?
// ----------------------|----------------|--------------------|------------------------------
// Wrong port            | Network        | Yes                | After fixing the port/server
// Bad hostname          | Network        | Yes                | After fixing the hostname
// HTTP 404              | HTTP           | No                 | Usually not without changing the URL
// HTTP 400              | HTTP           | No                 | Not without fixing the request
// HTTP 500              | HTTP           | No                 | Maybe; depends on the operation
// HTML parsed as JSON   | Parsing        | No; res.json rejects | After fixing the response format
// Invalid Task shape    | Validation     | No                 | After fixing the data/schema
// Timeout               | Timeout        | Yes                | Often for safe reads, with backoff
// Explicit abort        | Cancellation   | Yes                | Only if the request is still needed
// Stale request         | Cancellation/UI| First request: yes | Use the latest request instead
//
// Why must res.ok be checked inside try/catch?
// fetch() normally resolves for HTTP 4xx and 5xx responses instead of
// rejecting, so res.ok must be checked explicitly and an error thrown
// when it is false.
export {};
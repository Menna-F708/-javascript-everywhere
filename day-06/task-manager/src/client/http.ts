// client/http.ts — one careful fetch wrapper. Every way a request can fail becomes
// a typed ApiError instead of a crash. No DOM here, so it runs in Node too.

export type ApiError =
  | { kind: "network"; message: string }                  // no response at all
  | { kind: "timeout"; message: string }                  // took too long — we gave up
  | { kind: "aborted"; message: string }                  // we cancelled it on purpose
  | { kind: "http"; status: number; message: string }     // a response, but 4xx / 5xx
  | { kind: "parse"; message: string }                    // the body wasn't valid JSON
  | { kind: "shape"; message: string };                   // valid JSON, wrong shape

export type Result<T> = { ok: true; value: T } | { ok: false; error: ApiError };  

export interface RequestOptions<T> {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  check: (value: unknown) => value is T;   // a type guard for the response
  timeoutMs?: number;
  signal?: AbortSignal;                    // lets the caller cancel
}

// Read the server's { "error": "…" } message if it sent one
async function errorMessage(res: Response): Promise<string> {
  try {
    const body: unknown = await res.json();
    if (typeof body === "object" && body !== null && "error" in body && typeof body.error === "string") {
      return body.error;
    }
  } catch { 
    // not JSON — fall through
  }
  return res.statusText || `HTTP ${res.status}`;
}

export async function request<T>(url: string, options: RequestOptions<T>): Promise<Result<T>> {
  const { method = "GET", body, check, timeoutMs = 5000, signal } = options;
  const timeout = AbortSignal.timeout(timeoutMs);

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: body === undefined ? { Accept: "application/json" } : { Accept: "application/json", "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
    });
  } catch (err) {
    if (timeout.aborted) return { ok: false, error: { kind: "timeout", message: `No response after ${timeoutMs}ms` } };
    if (signal?.aborted) return { ok: false, error: { kind: "aborted", message: "Request cancelled" } };
    return { ok: false, error: { kind: "network", message: err instanceof Error ? err.message : String(err) } };
  }

  if (!res.ok) {
    return { ok: false, error: { kind: "http", status: res.status, message: await errorMessage(res) } };
  }

  if (res.status === 204) {
    // No Content — nothing to parse. The guard decides whether "nothing" is acceptable.
    return check(undefined) ? { ok: true, value: undefined as T } : { ok: false, error: { kind: "shape", message: "Expected a body, got 204" } };
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return { ok: false, error: { kind: "parse", message: "The response was not valid JSON" } };
  }

  if (!check(data)) return { ok: false, error: { kind: "shape", message: "The response had an unexpected shape" } };
  return { ok: true, value: data };
}

// A readable sentence for any ApiError — used by the UI and by scripts
export function describeError(error: ApiError): string {
  switch (error.kind) {
    case "network": return `Can't reach the server (${error.message}). Is it running?`;
    case "timeout": return `The server is too slow — ${error.message}.`;
    case "aborted": return "Cancelled.";
    case "http":    return `${error.status}: ${error.message}`;
    case "parse":   return "The server sent something that isn't JSON.";
    case "shape":   return "The server sent data in an unexpected shape.";
  }
} 
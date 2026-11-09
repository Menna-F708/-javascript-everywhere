import type { Task, NewTask, TaskUpdate } from "../shared/types.ts";
import { isTask } from "../shared/validate.ts";

const BASE_URL = "http://localhost:3000/api/tasks";

// Print the server's { error } response when a request fails.
async function checkResponse(response: Response): Promise<void> {
  if (response.ok) return;

  const text = await response.text();

  let message = `HTTP ${response.status} ${response.statusText}`;

  try {
    const body: unknown = JSON.parse(text);

    if (
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "string"
    ) {
      message = body.error;
    }
  } catch {
    if (text) message = text;
  }

  console.error("API error:", { error: message });
  throw new Error(message);
}

// Check the unknown JSON before treating it as a Task.
async function readTask(response: Response): Promise<Task> {
  await checkResponse(response);

  const data: unknown = await response.json();

  if (!isTask(data)) {
    throw new Error("The API returned an invalid Task");
  }

  // The value is now validated as Task.
  const task: Task = data;
  return task;
}

async function createTask(input: NewTask): Promise<Task> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (response.status !== 201) {
    await checkResponse(response);
    throw new Error(`Expected 201 Created, got ${response.status}`);
  }

  return readTask(response);
}

async function getTask(id: number): Promise<Task> {
  const response = await fetch(`${BASE_URL}/${id}`);
  return readTask(response);
}

async function updateTask(
  id: number,
  changes: TaskUpdate,
): Promise<Task> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changes),
  });

  return readTask(response);
}

async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  await checkResponse(response);

  if (response.status !== 204) {
    throw new Error(`Expected 204 No Content, got ${response.status}`);
  }

  // A 204 response has no body. Do not call response.json().
}

// Create, read, update two fields, and delete one task.
async function testSingleTask(): Promise<void> {
  console.log("\n--- Single-task CRUD ---");

  const created = await createTask({
    title: "CRUD lab task",
    priority: "low",
  });

  console.log("Created:", created);

  const read = await getTask(created.id);

  if (read.id !== created.id) {
    throw new Error("GET returned the wrong task");
  }

  console.log("Read:", read);

  // Update two fields in one PATCH request.
  // The third field, done, should remain unchanged.
  const updated = await updateTask(created.id, {
    title: "Updated CRUD lab task",
    priority: "high",
  });

  if (
    updated.title !== "Updated CRUD lab task" ||
    updated.priority !== "high"
  ) {
    throw new Error("PATCH did not update both requested fields");
  }

  if (updated.done !== read.done) {
    throw new Error("PATCH unexpectedly changed the done field");
  }

  console.log("Updated title and priority:", updated);
  console.log("Verified: done remained unchanged.");

  await deleteTask(created.id);

  console.log("Deleted task:", created.id);
}

// Create three tasks concurrently, then delete them concurrently.
async function testParallelTasks(): Promise<void> {
  console.log("\n--- Parallel operations ---");

  const inputs: NewTask[] = [
    { title: "Parallel task A", priority: "low" },
    { title: "Parallel task B", priority: "medium" },
    { title: "Parallel task C", priority: "high" },
  ];

  const createdTasks = await Promise.all(
    inputs.map((input) => createTask(input)),
  );

  console.log(
    "Created three tasks in parallel:",
    createdTasks.map((task) => task.id),
  );

  try {
    const readTasks = await Promise.all(
      createdTasks.map((task) => getTask(task.id)),
    );

    console.log(
      "Read three tasks in parallel:",
      readTasks.map((task) => task.title),
    );
  } finally {
    await Promise.all(
      createdTasks.map((task) => deleteTask(task.id)),
    );

    console.log("Deleted all three tasks in parallel.");
  }
}

async function main(): Promise<void> {
  await testSingleTask();
  await testParallelTasks();

  console.log("\nAll CRUD lab checks passed!");
}

main().catch((error: unknown) => {
  console.error("CRUD lab failed:", error);
  process.exitCode = 1;
});

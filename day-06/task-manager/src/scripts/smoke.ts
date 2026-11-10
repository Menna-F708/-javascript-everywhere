 const BASE_URL = "http://localhost:3000";

async function main() {
  // 1. Test GET
  const getResponse = await fetch(`${BASE_URL}/api/tasks`);

  if (!getResponse.ok) {
    throw new Error(`GET failed: ${getResponse.status}`);
  }

  const tasks = await getResponse.json();

  if (!Array.isArray(tasks)) {
    throw new Error("GET should return an array of tasks");
  }

  console.log("✅ GET tasks passed");

  // 2. Test POST
  const createResponse = await fetch(`${BASE_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Smoke test task",
      priority: "low",
    }),
  });

  if (createResponse.status !== 201) {
    throw new Error(`POST failed: ${createResponse.status}`);
  }

  const createdTask = await createResponse.json();
  const taskId = createdTask.id;

  console.log("✅ POST task passed");

  // 3. Test PATCH
  const updateResponse = await fetch(
    `${BASE_URL}/api/tasks/${taskId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: true }),
    },
  );

  if (!updateResponse.ok) {
    throw new Error(`PATCH failed: ${updateResponse.status}`);
  }

  const updatedTask = await updateResponse.json();

  if (updatedTask.done !== true) {
    throw new Error("PATCH did not update the task");
  }

  console.log("✅ PATCH task passed");

  // 4. Test DELETE
  const deleteResponse = await fetch(
    `${BASE_URL}/api/tasks/${taskId}`,
    { method: "DELETE" },
  );

  if (deleteResponse.status !== 204) {
    throw new Error(`DELETE failed: ${deleteResponse.status}`);
  }

  console.log("✅ DELETE task passed");
  console.log("\n🎉 All smoke tests passed!");
}

main().catch((error: unknown) => {
  console.error("❌ Smoke test failed:", error);
  process.exitCode = 1;
});




// scripts/smoke.ts — drive the API from Node with the SAME client code the browser uses.
// Start the server first (npm run api), then: npm run smoke

import { createTask, deleteTask, listTasks, setBaseUrl, updateTask } from "../client/api.ts";
import { describeError, type Result } from "../client/http.ts";

setBaseUrl(process.env.API_URL ?? "http://localhost:3000/api");

// Print a result, and hand back the value (or undefined) so the next step can use it
function show<T>(label: string, result: Result<T>): T | undefined {
  if (result.ok) {
    console.log(`✓ ${label}`);
    return result.value;
  }
  console.log(`✗ ${label} — ${describeError(result.error)}`);
  return undefined;
}

const before = show("list", await listTasks());
console.log(`  ${before?.length ?? 0} tasks on the server`);

const created = show("create", await createTask({ title: "Smoke test task", priority: "low" }));
if (created) {
  console.log(`  new id ${created.id}, created ${created.createdAt}`);
  const updated = show("update", await updateTask(created.id, { done: true, priority: "high" }));
  console.log(`  done=${updated?.done} priority=${updated?.priority}`);
  show("delete", await deleteTask(created.id));
  show("delete again (should be 404)", await deleteTask(created.id));
}

show("create with empty title (should be 400)", await createTask({ title: "   ", priority: "low" }));
show("update with bad priority (should be 400)", await updateTask(1, { priority: "urgent" as never })); 
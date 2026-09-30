import { readFile } from "node:fs/promises";

const content = await readFile("./data.txt", "utf8");

console.log("Task 15:");
console.log(content);

// This path is relative to the folder where Node was started,
// not relative to this JavaScript file.
 
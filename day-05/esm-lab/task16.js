import { readFile } from "node:fs/promises";

const fileUrl = new URL("./data.txt", import.meta.url);

const content = await readFile(fileUrl, "utf8");

console.log("Task 16:");
console.log(content);

// This path is built relative to this module,
// so it still works when the script is started from another folder.
 

// #15 uses "./data.txt" directly, so Node resolves it from the
// current folder where I started the command.
//
// #16 builds the path with import.meta.url, so the path is based
// on the JavaScript file itself and works even if I run it from
// another folder.
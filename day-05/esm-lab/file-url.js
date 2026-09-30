import { readFile } from "node:fs/promises";

const fileUrl = new URL("./data.txt", import.meta.url);

const content = await readFile(fileUrl, "utf8");

console.log("File content:");
console.log(content);
 


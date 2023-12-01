import fs from "fs";

export function readInput(fileName) {
  return fs.readFileSync(fileName, "utf-8");
}

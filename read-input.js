import fs from "fs";

export function readInput(fileName) {
  return fs.readFileSync(fileName, "utf-8").split("\n");
}

export function readInputNoSplit(fileName) {
  return fs.readFileSync(fileName, "utf-8");
}

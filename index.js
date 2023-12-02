import { execSync } from "child_process";

// read args from process.argv
const args = process.argv.slice(2);
const day = args[0];

// read the day and run a node process to run the code
// exec a process to run a file in node, write a function to run the code
const output = execSync(`node ./${day}/${day}.js`).toString();
console.log(output);

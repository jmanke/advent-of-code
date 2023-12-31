// --- Day 3: Gear Ratios ---

import { readInput } from "../read-input.js";

// You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

// It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

// "Aaah!"

// You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

// The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

// The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand,
// but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

// Here is an example engine schematic:

// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..

// In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

// Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?

const input = readInput("./day-03/input.txt");

function isSymbol(char) {
  return isNaN(parseInt(char)) && char !== "." && char !== undefined;
}

function partOne() {
  // const input = [
  //   "467..114..",
  //   "...*......",
  //   "..35..6333",
  //   "......#...",
  //   "617*......",
  //   ".....+.58.",
  //   "..592.....",
  //   "......755.",
  //   "...$.*....",
  //   ".664.598..",
  // ];

  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    let currNum = undefined;
    let foundSymbol = false;

    for (let j = 0; j < input[i].length; j++) {
      const char = input[i][j];
      const digit = parseInt(char);
      if (isNaN(digit)) {
        if (currNum && foundSymbol) {
          sum += parseInt(currNum);
        }
        currNum = undefined;
        foundSymbol = false;
        continue;
      }

      currNum = currNum ? currNum + char : char;
      foundSymbol =
        foundSymbol ||
        isSymbol(input[i - 1]?.[j - 1]) ||
        isSymbol(input[i - 1]?.[j]) ||
        isSymbol(input[i - 1]?.[j + 1]) ||
        isSymbol(input[i][j - 1]) ||
        isSymbol(input[i][j + 1]) ||
        isSymbol(input[i + 1]?.[j - 1]) ||
        isSymbol(input[i + 1]?.[j]) ||
        isSymbol(input[i + 1]?.[j + 1]);
    }

    if (currNum && foundSymbol) {
      sum += parseInt(currNum);
    }
  }

  return sum;
}

// --- Part Two ---

// The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola,
// finally ready to ascend to the water source.

// You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help",
// so you pick it up and the engineer answers.

// Before you can explain the situation, she suggests that you look out the window. There stands the engineer,
// holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

// The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two
// part numbers. Its gear ratio is the result of multiplying those two numbers together.

// This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear
// needs to be replaced.

// Consider the same engine schematic again:

// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..

// In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345.
// The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent
// to one part number.) Adding up all of the gear ratios produces 467835.

function partTwo() {
  let numberIds = [];
  let currId = 0;
  let idsToNumbers = {};

  // map each number to an id, and each id to a number
  for (let i = 0; i < input.length; i++) {
    let currNum;
    let ids = [];
    for (let j = 0; j < input[i].length; j++) {
      const char = input[i][j];
      const digit = parseInt(char);

      if (isNaN(digit)) {
        if (currNum) {
          idsToNumbers[currId] = parseInt(currNum);
          currId++;
        }
        currNum = undefined;
        ids[j] = null;
        continue;
      }

      ids[j] = currId;
      currNum = currNum ? currNum + char : char;
    }

    if (currNum) {
      idsToNumbers[currId] = parseInt(currNum);
      currId++;
    }

    numberIds.push(ids);
  }

  // for each * symbol, check if exactly two numbers are adjacent
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "*") {
        // check each adjacent cell for numbers
        let numbers = new Set();

        for (let k = i - 1; k < i + 2; k++) {
          for (let l = j - 1; l < j + 2; l++) {
            const id = numberIds[k][l];
            if (id !== undefined && id !== null) {
              numbers.add(id);
            }
          }
        }

        if (numbers.size === 2) {
          const iter = numbers.values();
          sum +=
            idsToNumbers[iter.next().value] * idsToNumbers[iter.next().value];
        }
      }
    }
  }

  return sum;
}

console.log("Part One: ", partOne());
console.log("Part Two: ", partTwo());

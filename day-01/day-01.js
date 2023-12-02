import { readInput } from "../read-input.js";

// --- Day 1: Trebuchet?! ---

// You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions")
// and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

// As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills.
// Consequently, the Elves are having trouble reading the values on the document.

// The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be
// found by combining the first digit and the last digit (in that order) to form a single two-digit number.

// For example:

// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet

// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

// Consider your entire calibration document. What is the sum of all of the calibration values?

const input = readInput("./day-01/input.txt");

// part 1:

function partOne() {
  const results = input.map((v) => {
    const numbers = v.match(/\d/g) ?? "0";
    return `${numbers[0]}${numbers[numbers.length - 1]}`;
  });
  return results.reduce((sum, v) => sum + parseInt(v), 0);
}

// part 2:

const Numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function toNumber(value) {
  let num = parseInt(value);
  if (isNaN(num)) {
    return Numbers[value];
  }

  return num;
}

// Regex in JS doesn't natively support overlapping matches. No matter, instead of
// solving this efficiently we're solving this with REGEX baby
function findOverlappingMatches(regex, input) {
  let match;
  const matches = [];

  while ((match = regex.exec(input)) !== null) {
    if (match[1]) {
      matches.push(match[1]);
    } else if (match[2]) {
      matches.push(match[2]);
    }

    if (match[0].length === 0) {
      regex.lastIndex++;
    }
  }

  if (matches.length === 0) {
    matches.push(0);
  }

  return matches;
}

function partTwo() {
  const results = input.map((v) => {
    const numbers = findOverlappingMatches(
      /(\d)|(?=(one|two|three|four|five|six|seven|eight|nine))/g,
      v
    );
    return toNumber(numbers[0]) * 10 + toNumber(numbers[numbers.length - 1]);
  });
  const result = results.reduce((sum, v) => sum + v, 0);

  return result;
}

console.log("Part one: ", partOne());
console.log("Part two: ", partTwo());

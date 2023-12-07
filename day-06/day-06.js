import { readInputNoSplit } from "../read-input.js";
const input = readInputNoSplit("./day-06/input.txt");

function partOne() {
  const parseValues = (v) => {
    return v
      .split(" ")
      .filter((t) => t !== "")
      .map((t) => parseInt(t));
  };

  let [_, times, distances] = input.match(/Time:(.*)\nDistance:(.*)/);
  times = parseValues(times);
  distances = parseValues(distances);
  const races = times.map((t, i) => [t, distances[i]]);

  const distance = (pushTime, duration) => {
    return (duration - pushTime) * pushTime;
  };

  return races.reduce((product, race) => {
    const [duration, target] = race;
    let wins = 0;
    for (let i = 0; i <= duration; i++) {
      if (distance(i, duration) > target) {
        wins++;
      }
    }

    return wins * product;
  }, 1);
}

function partTwo() {
  const parseValues = (v) => {
    return parseInt(v.replaceAll(" ", ""));
  };

  let [_, time, distance] = input.match(/Time:(.*)\nDistance:(.*)/);
  const duration = parseValues(time);
  const target = parseValues(distance);

  const calculateDistance = (pushTime, duration) => {
    return (duration - pushTime) * pushTime;
  };

  let wins = 0;
  for (let i = 0; i <= duration; i++) {
    if (calculateDistance(i, duration) > target) {
      wins++;
    }
  }

  return wins;
}

console.log("Part One: ", partOne());
console.log("Part Two: ", partTwo());

import { readInputNoSplit } from "../read-input.js";
const input = readInputNoSplit("./day-05/input.txt");

function partOne() {
  //   const input = `
  // seeds: 79 14 55 13

  // seed-to-soil map:
  // 50 98 2
  // 52 50 48

  // soil-to-fertilizer map:
  // 0 15 37
  // 37 52 2
  // 39 0 15

  // fertilizer-to-water map:
  // 49 53 8
  // 0 11 42
  // 42 0 7
  // 57 7 4

  // water-to-light map:
  // 88 18 7
  // 18 25 70

  // light-to-temperature map:
  // 45 77 23
  // 81 45 19
  // 68 64 13

  // temperature-to-humidity map:
  // 0 69 1
  // 1 0 69

  // humidity-to-location map:
  // 60 56 37
  // 56 93 4`;

  const [seedsRaw, ...rest] = input.split("\n\n");
  const seeds = seedsRaw
    .split(" ")
    .slice(1)
    .map((v) => parseInt(v));
  const seedMap = rest.map((v) =>
    v
      .split("\n")
      .slice(1)
      .map((v) => v.split(" ").map((v) => parseInt(v)))
  );

  return Math.min(
    ...seeds.map((seed) =>
      seedMap.reduce((curr, m) => {
        for (let i = 0; i < m.length; i++) {
          const [dst, src, rng] = m[i];
          if (curr >= src && curr < src + rng) {
            return curr - (src - dst);
          }
        }

        return curr;
      }, seed)
    )
  );
}

function partTwo() {
  const input = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

  const [seedsRaw, ...rest] = input.split("\n\n");
  let seedValues = seedsRaw
    .split(" ")
    .slice(1)
    .map((v) => parseInt(v));
  let seeds = [];
  for (let i = 0; i < seedValues.length; i += 2) {
    // seed min/max [min, max]
    seeds.push([seedValues[i], seedValues[i] + seedValues[i + 1] - 1]);
  }
  seeds = seeds.sort((a, b) => a.min - b.min);
  const seedGroupMaps = rest.map((v) =>
    v
      .split("\n")
      .slice(1)
      .map((v) => {
        const [dst, src, rng] = v.split(" ").map((v) => parseInt(v));
        // min, max, offset
        return [src, src + rng - 1, dst - src];
      })
      .sort((a, b) => a.min - b.min)
  );

  const results = seedGroupMaps.reduce((seeds, seedMaps, i) => {
    let newSeeds = [];

    console.log(seedMaps, i);
    seeds.forEach(([seedMin, seedMax]) => {
      const validMaps = seedMaps.filter(
        (seedMap) => seedMap[0] <= seedMax && seedMap[1] >= seedMin
      );

      if (validMaps.length === 0) {
        newSeeds = [...newSeeds, [seedMin, seedMax]];
        return;
      }

      let curr = seedMin;
      let mapIndex = 0;

      let s = [];
      while (curr < seedMax && mapIndex < validMaps.length) {
        // check next boundary.
        const [min, max, offset] = validMaps[mapIndex];

        if (curr < min) {
          s.push([curr, min - 1]);
          curr = min;
          continue;
        }

        const newSeed = [
          curr + offset,
          (seedMax < max ? seedMax : max) + offset,
        ];
        if (newSeed[0] === 0) {
          console.log("@@@", [seedMin, seedMax]);
          console.log(curr, offset);
        }
        s.push(newSeed);
        curr = newSeed[1] + 1;
        mapIndex++;
      }

      if (s.length === 0) {
        s.push([seedMin, seedMax]);
      }

      if (curr < seedMax) {
        s.push([curr, seedMax]);
      }

      newSeeds = [...newSeeds, ...s];
    });

    return newSeeds;
  }, seeds);

  return results;
}

console.log("Part One: ", partOne());
console.log("Part Two: ", partTwo());

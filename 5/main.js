import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");

const setInstructions = () =>
  data
    .filter((line) => line[0] === "m")
    .map((line) => line.match(/\d+/g))
    .reverse();

const reverseStackData = [...data.reverse()].filter((x) => x && x[0] !== "m");

const stacks = {};

reverseStackData.forEach((line, index) => {
  if (index === 0) [...line].forEach((x) => (x !== " " ? (stacks[x] = []) : null));
  else {
    [...line].forEach((x, index) =>
      (index - 1) % 4 === 0 && x !== " " ? stacks[(index - 1) / 4 + 1].push(x) : []
    );
  }
});

// Part 1
// setInstructions().forEach((line) => {
//   for (let i = 0; i < parseInt(line[0]); i++) stacks[line[2]].push(stacks[line[1]].pop());
// });

// Part 2
setInstructions().forEach((line) =>
  stacks[line[2]].push(...stacks[line[1]].splice(-line[0], line[0]))
);

const result = Object.values(stacks)
  .map((x) => x.slice(-1))
  .join("");

console.table(result);

import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");

const stacks = {};

(function createStacks() {
  const reverseStackData = [...data.reverse()].filter((x) => x && x[0] !== "m");

  reverseStackData.forEach((line, index) => {
    if (index === 0) [...line].forEach((x) => (x !== " " ? (stacks[x] = []) : null));
    else {
      [...line].forEach((x, index) =>
        (index - 1) % 4 === 0 && x !== " " ? stacks[(index - 1) / 4 + 1].push(x) : []
      );
    }
  });
})();

const instructions = () =>
  data
    .filter((line) => line[0] === "m")
    .map((line) => line.match(/\d+/g))
    .reverse();

instructions().forEach((line, index) => {
  for (let i = 0; i < parseInt(line[0]); i++) stacks[line[2]].push(stacks[line[1]].pop());
});

const result = Object.values(stacks)
  .map((x) => x.slice(-1))
  .join("");

console.table(result);

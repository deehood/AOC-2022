import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");

const fill = (arr) => {
  const filled = [];
  for (let i = parseInt(arr[0]); i <= parseInt(arr[1]); i++) filled.push(i);
  return filled;
};

const checkLine = (line) => {
  line = line.map((x) => x.split("-")).map((x) => fill(x));
  if (line[0].every((x) => line[1].includes(x)) || line[1].every((x) => line[0].includes(x)))
    return 1;
  return 0;
};

const result = data.reduce((sum, line) => (sum += checkLine(line.split(","))), 0);

console.log(result);

import * as fs from "fs";
const dataLines = fs.readFileSync("data", "utf8").split("\n");
let data = dataLines.map((line) => [...line]);

let S = {};
let maxRows = data.length;
let maxCols = data[0].length;

data.forEach((line, index1) =>
  line.map((chr, index2) => {
    if (chr === "S") {
      S = [index1, index2, 0];
      data[index1][index2] = "a";
    }
    if (chr === "E") {
      data[index1][index2] = "z";
    }
  })
);

const adj = (current) => {
  const [row, col] = current;
  let arr = [];
  let currentChr = data[row][col].charCodeAt(0);
  if (row > 0) if (data[row - 1][col].charCodeAt(0) - currentChr < 2) arr.push([row - 1, col]);

  if (row < maxRows - 1)
    if (data[row + 1][col].charCodeAt(0) - currentChr < 2) arr.push([row + 1, col]);

  if (col > 0) if (data[row][col - 1].charCodeAt(0) - currentChr < 2) arr.push([row, col - 1]);

  if (col < maxCols - 1)
    if (data[row][col + 1].charCodeAt(0) - currentChr < 2) arr.push([row, col + 1]);

  return arr;
};

let queue = [];
let visited = new Set();
let current = [];

queue.push(S);

visited.add(JSON.stringify([S[0], S[1]]));

while (queue.length > 0) {
  current = queue.shift();
  console.log(current);
  if (data[current[0]][current[1]] === "z") {
    console.log("result", current);
    break;
  }

  adj(current).forEach((child) => {
    if (!visited.has(JSON.stringify(child))) {
      visited.add(JSON.stringify(child));
      queue.push([...child, current[2] + 1]);
    }
  });
}

import * as fs from "fs";
const dataLines = fs.readFileSync("data", "utf8").split("\n");
let data = dataLines.map((line) => [...line]);

let S = {};
let A = [];
let results = [];
let ROWS = data.length;
let COLS = data[0].length;

data.forEach((line, index1) =>
  line.map((chr, index2) => {
    if (chr === "a") A.push([index1, index2, 0]);
    if (chr === "S") {
      data[index1][index2] = "a";
      A.push([index1, index2, 0]);
    }

    if (chr === "E") {
      data[index1][index2] = "z";
    }
  })
);

const adjacency = (current) => {
  const [row, col] = current;
  let arr = [];
  let currentChr = data[row][col].charCodeAt(0);
  if (row > 0) if (data[row - 1][col].charCodeAt(0) - currentChr < 2) arr.push([row - 1, col]);

  if (row < ROWS - 1)
    if (data[row + 1][col].charCodeAt(0) - currentChr < 2) arr.push([row + 1, col]);

  if (col > 0) if (data[row][col - 1].charCodeAt(0) - currentChr < 2) arr.push([row, col - 1]);

  if (col < COLS - 1)
    if (data[row][col + 1].charCodeAt(0) - currentChr < 2) arr.push([row, col + 1]);

  return arr;
};
for (let i = 0; i < A.length; i++) {
  let queue = [];
  let visited = new Set();
  let current = [];
  S = A[i];

  queue.push(S);

  visited.add(JSON.stringify([S[0], S[1]]));

  while (queue.length > 0) {
    current = queue.shift();
    if (data[current[0]][current[1]] === "z") {
      console.log("hey", data[current[0]][current[1]]);
      console.log(current);
      results.push(current[2]);
      break;
    }

    adjacency(current).forEach((child) => {
      if (!visited.has(JSON.stringify(child))) {
        visited.add(JSON.stringify(child));
        queue.push([...child, current[2] + 1]);
      }
    });
  }
}
console.log(Math.min(...results));

import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("");
// const data = [..."bvwbjplbgvbhsrlpgdmjqwftvncz"];

const isUnique = (arr) => arr.length === new Set(arr).size;

const arr = data.splice(0, 4);

let i = 4;
for (; i < data.length; i++) {
  if (isUnique(arr)) break;
  arr.splice(0, 1);
  arr.push(data[i - 4]);
}

console.log(i);

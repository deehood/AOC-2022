import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("");

const isUnique = (arr) => arr.length === new Set(arr).size;

//1
// const arr = data.slice(0, 4);
// let i = 4;

//2
const arr = data.slice(0, 14);
let i = 14;

for (; i < data.length; i++) {
  if (isUnique(arr)) break;
  arr.splice(0, 1);
  arr.push(data[i]);
}

console.log(i);

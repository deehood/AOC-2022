import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("");

const isUnique = (arr) => arr.length === new Set(arr).size;

//1 let i = 4;
//2
let i = 14;

const arr = data.slice(0, i);

for (; i < data.length; i++) {
  if (isUnique(arr)) break;
  arr.splice(0, 1);
  arr.push(data[i]);
}

console.log(i);

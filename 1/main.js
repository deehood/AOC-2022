import * as fs from "fs";

const data = fs.readFileSync("data.txt", "utf8").split("\n");

let dwarf = 0;
let sum = 0;
let store = {};

for (let i = 0; i < data.length; i++) {
  if (data[i]) sum += parseInt(data[i]);
  else {
    store[sum] = dwarf;
    dwarf++;
    sum = 0;
  }
}

const arr = Object.keys(store);

//1
console.log(arr[arr.length - 1]);

//2
let result = 0;

for (let i = arr.length - 1; i > arr.length - 4; i--) {
  result += parseInt(arr[i]);
}

console.log(result);

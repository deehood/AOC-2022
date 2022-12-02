import * as fs from "fs";
const data = fs.readFileSync("data.txt", "utf8").split("\n");

let dwarf = 0,
  sum = 0;
let arr = [];

data.forEach((value) => {
  if (value) sum += parseInt(value);
  else {
    arr[dwarf] = sum;
    dwarf++;
    sum = 0;
  }
});

arr = arr.sort((a, b) => b - a);
//1
console.log(arr[0]);
//2
console.log(arr[0] + arr[1] + arr[2]);

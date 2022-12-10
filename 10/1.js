import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");
const inst = data.map((line) => line.split(" "));

let x = 1;
let ip = 0;
let cycle = 0;
let deltaX = 0;
let deltaClock = 0;
let results = [];

const readNext = () => {
  let wait = 0;
  let add = 0;
  if (inst[ip] === "noop") wait = 1;
  if (inst[ip].length > 1 && inst[ip][0] === "addx") {
    wait = 2;
    add = parseInt(inst[ip][1]);
  }
  ip++;
  return [wait, add];
};

while (ip < inst.length + deltaClock - 1) {
  cycle++;
  if (deltaClock > 0) deltaClock--;
  if (deltaClock === 0) x += deltaX;
  console.log("cycle", cycle);
  console.log("inst", inst[ip]);

  if (deltaClock === 0) [deltaClock, deltaX] = readNext();

  console.log("signal", cycle * x);
  console.log("x", x);
  console.log("----------------------------");

  if (cycle === 20 || (cycle - 20) % 40 === 0) results.push(cycle * x);
}
const result = results.reduce((sum, next) => sum + next);
console.log("total", result);

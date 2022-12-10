import * as fs from "fs";
const data = fs.readFileSync("data3", "utf8").split("\n");
const inst = data.map((line) => line.split(" "));

let x = 1;
let ip = 0;
let cycle = 0;
let deltaX = 0;
let deltaClock = 0;
let results2 = [];

let line = [];
let screen = [];

for (let i = 0; i < 40; i++) {
  line.push(".");
}
for (let i = 0; i < 6; i++) {
  screen.push([...line]);
}

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

while (ip < inst.length + deltaClock) {
  cycle++;
  if (deltaClock > 0) deltaClock--;
  if (deltaClock === 0) x += deltaX;
  console.log("cycle", cycle);
  console.log("inst", inst[ip]);

  if (deltaClock === 0) [deltaClock, deltaX] = readNext();

  console.log("signal", cycle * x);
  console.log("x", x);
  console.log("----------------------------");

  if (cycle === 20 || (cycle - 20) % 40 === 0) results2.push(cycle * x);

  //draw pixel at cycle 0
  let horiz;
  if (cycle === x - 1 || cycle === x || cycle === x + 1) {
    console.log(Math.floor(cycle / 6), x > 39 ? x % 40 : x);
    console.log(x);
    if (x < 241) screen[Math.floor(cycle / 40)][x > 39 ? x % 40 : x] = "#";
  }
  // x is sprite
  if (cycle > 237) {
    console.table(screen);
  }
  //x changed position place shit there
}

const result2 = results2.reduce((sum, next) => sum + next);
console.log("total", result2);

import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");
const inst = data.map((line) => line.split(" "));

let x = 1;
let ip = 0;
let cycle = 0;
let deltaX = 0;
let deltaClock = 0;
let hPos = 0;
let vPos = 0;

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
  if (deltaClock === 0) [deltaClock, deltaX] = readNext();

  vPos = Math.floor(cycle / 40);
  hPos = cycle - vPos * 40 - 1;

  if ((hPos === x - 1 || hPos === x || hPos === x + 1) && cycle < 240) {
    screen[vPos][hPos] = "#";
  } else {
    if (cycle < 240) screen[vPos][hPos] = " ";
  }
}

screen.map((line) => console.log(line.join("")));

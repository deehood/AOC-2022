import * as fs from "fs";
const dataLines = fs
  .readFileSync("data", "utf8")
  .split("\n")
  .map((line) => line.split(" -> "));
let data = dataLines.map((line) =>
  line.map((group) =>
    group
      .split(",")
      .reverse()
      .map((field) => parseInt(field))
  )
);

const print = (arr) => arr.map((line) => console.log(line.join("")));

const maxR = Math.max(...data.flat().map((pos) => pos[0]));
const maxC = Math.max(...data.flat().map((pos) => pos[1]));
const minC = Math.min(...data.flat().map((pos) => pos[1]));

const cave = [];

const row = new Array((maxC - minC) * 10 + 1).fill(".");

for (let i = 0; i < maxR + 2; i++) cave.push([...row]);
const floor = new Array((maxC - minC) * 10 + 1).fill("#");
cave.push(floor);

const OFFSET_C = minC - Math.floor(floor.length / 2);

for (let k = 0; k < data.length; k++) {
  let deltaC = 0;
  let deltaR = 0;
  for (let i = 0; i < data[k].length - 1; i++) {
    let fromRow = data[k][i][0];
    let fromCol = data[k][i][1] - OFFSET_C;
    let toRow = data[k][i + 1][0];
    let toCol = data[k][i + 1][1] - OFFSET_C;

    // delta- Down  delta+UP
    deltaR = fromRow - toRow;
    let startR = deltaR < 0 ? fromRow : fromRow - deltaR;
    for (let j = 0; j <= Math.abs(deltaR); j++) {
      console.log(startR + j, fromCol);
      if (startR + j < maxR) cave[startR + j][fromCol] = "#";
    }

    // delta + LEFT   delta- RIGHT

    deltaC = fromCol - toCol;
    let startC = deltaC > 0 ? fromCol - deltaC : fromCol;
    for (let j = 0; j <= Math.abs(deltaC); j++) {
      console.log(j, startC);
      if (startC + j < maxC) cave[fromRow][startC + j] = "#";
    }
  }
}

class Sand {
  constructor(name, r, c) {
    this.name = name;
    this.r = r;
    this.c = c;
    this.stop = false;
  }
  fall() {
    if (!this.findObstacle(this.r + 1, this.c)) {
      this.r++;
    } else {
      if (!this.findObstacle(this.r + 1, this.c - 1)) {
        this.r++;
        this.c--;
      } else {
        if (!this.findObstacle(this.r + 1, this.c + 1)) {
          this.r++;
          this.c++;
        } else {
          this.stop = true;
          cave[this.r][this.c - OFFSET_C] = "o";
        }
      }
    }
  }
  findObstacle(r, c) {
    if (r === 0) {
      console.log(c);
      print(cave);
      console.log(` ${this.name - 1} sand in the grid`);
      process.exit();
    }
    return cave[r][c - OFFSET_C] === "#" || cave[r][c - OFFSET_C] === "o" ? true : false;
  }
}

const sand = [];
for (let i = 1; i < 100000; i++) {
  sand[i] = new Sand(i, 0, 500);
  while (sand[i].stop === false) {
    sand[i].fall();
  }
  console.log(i, sand[i].r, sand[i].c, sand[i].stop);
  if (sand[i].r === 0 && sand[i].c === 500 && sand[i].stop === true) {
    console.log(`sand ${sand[i].name} blocked the hole`);
    break;
  }
}

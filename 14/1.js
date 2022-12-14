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
const OFFSET_C = minC - Math.floor((maxC - minC) / 2);
const cave = [];

const row = new Array((maxC - minC) * 2 + 1).fill(".");
for (let i = 0; i < maxR + 1; i++) cave.push([...row]);

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
      if (startR + j < maxR) cave[startR + j][fromCol] = "#";
    }

    // delta + LEFT   delta- RIGHT

    deltaC = fromCol - toCol;
    let startC = deltaC > 0 ? fromCol - deltaC : fromCol;
    for (let j = 0; j <= Math.abs(deltaC); j++) {
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
    if (c - OFFSET_C < 0 || c > maxC || r < 0 || r > maxR) {
      print(cave);
      console.log(` ${this.name - 1} sand in the grid`);
      process.exit();
    }
    return cave[r][c - OFFSET_C] === "#" || cave[r][c - OFFSET_C] === "o" ? true : false;
  }
}

const sand = [];
for (let i = 1; i < Infinity; i++) {
  sand[i] = new Sand(i, 0, 500);
  while (sand[i].stop === false) {
    sand[i].fall();
  }
}

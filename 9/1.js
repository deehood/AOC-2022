import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");

class Rope {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.history = [{ x: 0, y: 0 }];
  }
  getPos() {
    return { x: this.x, y: this.y };
  }
  setPos(x, y) {
    this.x = x;
    this.y = y;
    this.history.push({ x: this.x, y: this.y });
  }

  instruction(inst) {
    switch (inst) {
      case "R":
        this.x += 1;
        break;
      case "L":
        this.x -= 1;
        break;
      case "U":
        this.y -= 1;
        break;
      case "D":
        this.y += 1;
        break;
    }
    this.history.push({ x: this.x, y: this.y });
  }
}

const isTouching = (h, t) => Math.abs(h.x - t.x) < 2 && Math.abs(h.y - t.y) < 2;

const isSideways = (h, t) => Math.abs(h.x - t.x) + Math.abs(h.y - t.y) === 3;

const H = new Rope(0, 0);
const T = new Rope(0, 0);

for (let line of data) {
  let [inst, val] = [...line.split(" ")];

  for (let i = 1; i <= parseInt(val); i++) {
    H.instruction(inst);
    if (!isTouching(H.getPos(), T.getPos())) {
      isSideways(H.getPos(), T.getPos())
        ? T.setPos(H.history[H.history.length - 2].x, H.history[H.history.length - 2].y)
        : T.instruction(inst);
    }
  }
}

const result = new Set(T.history.map((x) => JSON.stringify(x)));
console.log("visited", result.size);

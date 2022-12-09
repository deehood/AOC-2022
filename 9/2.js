import * as fs from "fs";
const data = fs.readFileSync("data3", "utf8").split("\n");

class Rope {
  constructor(name, x, y) {
    this.name = name;
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

const H = new Rope("H", 0, 0);
const T = [];
for (let i = 1; i < 10; i++) {
  T.push(new Rope(i.toString(), 0, 0));
}
console.log(T);
for (let line of data) {
  let [inst, val] = [...line.split(" ")];

  for (let i = 1; i <= parseInt(val); i++) {
    H.instruction(inst);
    if (!isTouching(H.getPos(), T[0].getPos())) {
      isSideways(H.getPos(), T[0].getPos())
        ? T[0].setPos(H.history[H.history.length - 2].x, H.history[H.history.length - 2].y)
        : T[0].instruction(inst);
    }

    for (let j = 1; j < 9; j++)
      if (!isTouching(T[j - 1].getPos(), T[j].getPos())) {
        isSideways(T[j - 1].getPos(), T[j].getPos())
          ? T[j].setPos(
              T[j - 1].history[T[j - 1].history.length - 2].x,
              T[j - 1].history[T[j - 1].history.length - 2].y
            )
          : T[j].instruction(inst);
      }
  }
}

const result = new Set(T.history.map((x) => JSON.stringify(x)));
console.log("visited", result.size);

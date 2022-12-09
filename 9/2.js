import * as fs from "fs";
const data = fs.readFileSync("data2", "utf8").split("\n");

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
let parent = [];
let inst = "";
let val = "";
for (let line of data) {
  [inst, val] = [...line.split(" ")];

  for (let i = 1; i <= parseInt(val); i++) {
    H.instruction(inst);

    if (inst === "U") {
      console.log(
        T.map((el) => {
          return { name: el.name, x: el.x, y: el.y };
        })
      );

      console.log(inst);
      console.log({ name: H.name, x: H.x, y: H.y });
    }

    for (let j = 0; j < 9; j++) {
      parent = j > 0 ? T[j - 1] : H;
      if (!isTouching(parent.getPos(), T[j].getPos())) {
        isSideways(parent.getPos(), T[j].getPos())
          ? T[j].setPos(
              parent.history[parent.history.length - 2].x,
              parent.history[parent.history.length - 2].y
            )
          : T[j].instruction(inst);
      }
    }
  }
}
// console.log("H", H);
// console.log("T8", T[7]);
// console.log("T9", T[8]);
// console.log("T1", T[0]);
// console.log("T2", T[1]);

const result = new Set(T[8].history.map((x) => JSON.stringify(x)));
console.log("visited", result.size);

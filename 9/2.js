import * as fs from "fs";
const data = fs.readFileSync("./data3", "utf8").split("\n");

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
        this.y += 1;
        break;
      case "D":
        this.y -= 1;
        break;
    }
    this.history.push({ x: this.x, y: this.y });
  }
}

const distance = (h, t) => Math.abs(h.x - t.x) + Math.abs(h.y - t.y);

const H = new Rope("H", 0, 0);
const T = [];
for (let i = 1; i < 10; i++) {
  T.push(new Rope(i.toString(), 0, 0));
}

const drawTable = (size) => {
  let rows = [];
  let table = [];
  let chr = ".";
  let offset = size / 2;
  for (let i = size - 1; i >= 0; i--) {
    rows[i] = [];

    for (let j = 0; j < size; j++) {
      chr = ".";
      if (H.getPos().x + offset == j && H.getPos().y + offset == i) chr = "H";
      for (let k = 8; k >= 0; k--) {
        if (T[k].getPos().x + offset == j && T[k].getPos().y + offset == i)
          chr = (k + 1).toString();
      }
      rows[i].push(chr);
    }
    table.push(rows[i]);
  }
  return table;
};

let parent = [];
let inst = "";
let val = "";
let deltaX,
  deltaY = 0;
for (let line of data) {
  [inst, val] = [...line.split(" ")];

  for (let i = 1; i <= parseInt(val); i++) {
    H.instruction(inst);

    for (let j = 0; j < 9; j++) {
      parent = j > 0 ? T[j - 1] : H;

      switch (distance(parent.getPos(), T[j].getPos())) {
        case 2: {
          // follow the parent
          if (parent.x === T[j].x) T[j].setPos(T[j].x, (parent.y + T[j].y) / 2);
          if (parent.y === T[j].y) T[j].setPos((parent.x + T[j].x) / 2, T[j].y);

          break;
        }
        case 3: {
          //move to old parent position if it makes it right next to parent
          if (
            distance(
              {
                x: parent.history[parent.history.length - 2].x,
                y: parent.history[parent.history.length - 2].y,
              },
              parent.getPos()
            ) === 1
          ) {
            T[j].setPos(
              parent.history[parent.history.length - 2].x,
              parent.history[parent.history.length - 2].y
            );
          } else {
            // move the same way the parent did
            deltaX =
              parent.history[parent.history.length - 1].x -
              parent.history[parent.history.length - 2].x;
            deltaY =
              parent.history[parent.history.length - 1].y -
              parent.history[parent.history.length - 2].y;
            T[j].setPos(T[j].x + deltaX, T[j].y + deltaY);
          }

          break;
        }

        case 4: {
          deltaX =
            parent.history[parent.history.length - 1].x -
            parent.history[parent.history.length - 2].x;
          deltaY =
            parent.history[parent.history.length - 1].y -
            parent.history[parent.history.length - 2].y;
          T[j].setPos(T[j].x + deltaX, T[j].y + deltaY);

          break;
        }
        default:
          //do nothing
          break;
      }
    }
  }

  console.log(inst, val);
  console.table(drawTable(20));
}

console.log("Tail", T[8]);

const result = new Set(T[8].history.map((x) => JSON.stringify(x)));

console.log("visited", result.size);

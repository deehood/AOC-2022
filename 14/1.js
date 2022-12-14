import * as fs from "fs";
const dataLines = fs
  .readFileSync("data2", "utf8")
  .split("\n")
  .map((line) => line.split(" -> "));
const data = dataLines.map((line) =>
  line.map((group) => group.split(",").map((field) => parseInt(field)))
);
console.log(data);

class Sand {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.stop = false;
  }
  fall() {
    if (!this.findObstacle(this.x, this.y + 1)) {
      this.y++;
    } else {
      if (!this.findObstacle(this.x - 1, this.y + 1)) {
        this.x--;
        this.y++;
      } else {
        if (!this.findObstacle(this.x + 1, this.y + 1)) {
          this.x++;
          this.y++;
        } else this.stop = true;
      }
    }
  }
  findObstacle() {
    return false;
  }
  getPos() {
    return [this.x, this.y];
  }
}

const sand = [];
for (let i = 0; i < 10; i++) {
  if (i < 1 || sand[i - 1]?.stop === true) {
    sand[i] = new Sand(i, 500, 0);
    sand[i].fall();
    console.log(sand[i].getPos());
  }
}

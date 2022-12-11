import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");

class Monkey {
  constructor(name, initialItems, operation, test, positive, negative) {
    this.name = name;
    this.items = [...initialItems];
    this.operation = operation;
    this.test = test;
    this.positive = positive;
    this.negative = negative;
    this.inspected = 0;
  }
  addItem(item) {
    this.items.push(item);
  }

  operation() {
    this.new = operation(old);
  }

  runTest(item) {
    return item % this.test === 0;
  }

  send(item, monkey) {
    M[monkey].addItem(item);
  }

  process() {
    while (this.items.length > 0) {
      this.inspected++;
      let oldValue = this.operation(this.items.shift());
      let newValue = Math.floor(oldValue / 3);
      this.runTest(newValue)
        ? this.send(newValue, this.positive)
        : this.send(newValue, this.negative);
    }
  }
}
const M = [];
M[0] = new Monkey(0, [57, 58], (x) => x * 19, 7, 2, 3);
M[1] = new Monkey(1, [66, 52, 59, 79, 94, 73], (x) => x + 1, 19, 4, 6);
M[2] = new Monkey(2, [80], (x) => x + 6, 5, 7, 5);
M[3] = new Monkey(3, [82, 81, 68, 66, 71, 83, 75, 97], (x) => x + 5, 11, 5, 2);
M[4] = new Monkey(4, [55, 52, 67, 70, 69, 94, 90], (x) => x * x, 17, 0, 3);
M[5] = new Monkey(5, [69, 85, 89, 91], (x) => x + 7, 13, 1, 7);
M[6] = new Monkey(6, [75, 53, 73, 52, 75], (x) => x * 7, 2, 0, 4);
M[7] = new Monkey(7, [94, 60, 79], (x) => x + 2, 3, 1, 6);

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 8; j++) {
    M[j].process();
  }
}
console.log("----------------------------------------------");

for (let i = 0; i < 8; i++) {
  console.log(M[i]);
}
console.log("----------------------------------------------");

const result = M.sort((a, b) => b.inspected - a.inspected)
  .filter((_, index) => index < 2)
  .reduce((prod, next) => prod * next.inspected, 1);
console.log("result", result);

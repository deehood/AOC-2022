class Monkey {
  constructor(name, initialItems, operation, test, positive, negative) {
    this.name = name;
    this.items = [...initialItems.map((x) => x * (23 * 19 * 13 * 17))];
    this.operation = operation;
    this.test = test;
    this.positive = positive;
    this.negative = negative;
    this.inspected = 0;
  }
  addItem(item) {
    this.items.push(item);
  }

  runTest(newValue) {
    return newValue % this.test === 0;
  }

  send(item, monkey) {
    M[monkey].addItem(item);
  }

  process() {
    while (this.items.length > 0) {
      this.inspected++;
      let newValue = this.items.shift();
      this.runTest(this.operation(newValue))
        ? this.send(newValue % this.test, this.positive)
        : this.send(newValue % this.test, this.negative);
    }
  }
}
const M = [];

M[0] = new Monkey(0, [79, 98], (x) => x * 19, 23, 2, 3);
M[1] = new Monkey(1, [54, 65, 75, 74], (x) => x + 6, 19, 2, 0);
M[2] = new Monkey(2, [79, 60, 97], (x) => x * x, 13, 1, 3);
M[3] = new Monkey(3, [74], (x) => x + 3, 17, 0, 1);
console.log(M[0]);

// M[0] = new Monkey(0, [79, 98], (x) => BigInt(x) * BigInt(19), 23, 2, 3);
// M[1] = new Monkey(1, [54, 65, 75, 74], (x) => BigInt(x) + BigInt(6), 19, 2, 0);
// M[2] = new Monkey(2, [79, 60, 97], (x) => BigInt(x) * BigInt(x), 13, 1, 3);
// M[3] = new Monkey(3, [74], (x) => BigInt(x) + BigInt(3), 17, 0, 1);
for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < 4; j++) {
    M[j].process();
  }

  if (i + 1 === 1 || i + 1 === 20 || (i + 1) % 1000 === 0) {
    console.log(i + 1, "--------------------------------");
    for (let k = 0; k < 4; k++) {
      console.log(k, M[k].inspected);
    }
    // console.log(M[0]);
    // console.log(M[1]);
    // console.log(M[2]);
    // console.log(M[3]);
  }
}

// M[0] = new Monkey(0, [57, 58], (x) => x * 19, 7, 2, 3);
// M[1] = new Monkey(1, [66, 52, 59, 79, 94, 73], (x) => x + 1, 19, 4, 6);
// M[2] = new Monkey(2, [80], (x) => x + 6, 5, 7, 5);
// M[3] = new Monkey(3, [82, 81, 68, 66, 71, 83, 75, 97], (x) => x + 5, 11, 5, 2);
// M[4] = new Monkey(4, [55, 52, 67, 70, 69, 94, 90], (x) => x * x, 17, 0, 3);
// M[5] = new Monkey(5, [69, 85, 89, 91], (x) => x + 7, 13, 1, 7);
// M[6] = new Monkey(6, [75, 53, 73, 52, 75], (x) => x * 7, 2, 0, 4);
// M[7] = new Monkey(7, [94, 60, 79], (x) => x + 2, 3, 1, 6);

// for (let i = 0; i < 10000; i++) {
//   for (let j = 0; j < 8; j++) {
//     M[j].process();
//   }
// }
// console.log("----------------------------------------------");

// for (let i = 0; i < 8; i++) {
//   console.log(M[i]);
// }
// console.log("----------------------------------------------");

const result = M.sort((a, b) => b.inspected - a.inspected)
  .filter((_, index) => index < 2)
  .reduce((prod, next) => prod * next.inspected, 1);
console.log("result", result);

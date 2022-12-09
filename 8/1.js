import * as fs from "fs";
const dataStrings = fs.readFileSync("data", "utf8").split("\n");
const data = dataStrings.map((x) => x.split(""));

let newData = [];

function rot90() {
  let n = newData.length;
  for (let i = 0; i < n / 2; i++) {
    for (let j = i; j < n - i - 1; j++) {
      var tmp = newData[i][j];
      newData[i][j] = newData[j][n - i - 1];
      newData[j][n - i - 1] = newData[n - i - 1][n - j - 1];
      newData[n - i - 1][n - j - 1] = newData[n - j - 1][i];
      newData[n - j - 1][i] = tmp;
    }
  }
}

const checkSide = (direction) => {
  let line = [];
  let max = 0;

  for (let i = 1; i < newData.length - 1; i++) {
    line = newData[i];
    max = parseInt(line[0].val);
    for (let j = 1; j < line.length - 1; j++) {
      if (parseInt(line[j].val) > max) {
        newData[i][j].visible.push(direction);
        max = newData[i][j].val;
      }
    }
  }
};

newData = data.map((line, i1) =>
  line.map((_, i2) => {
    return { pos: i1.toString() + i2.toString(), val: line[i2], visible: [] };
  })
);

checkSide("W");
console.log("W", newData);
rot90();

checkSide("N");
console.log("N", newData);
rot90();
checkSide("E");
console.log("E", newData);
rot90();
checkSide("S");
console.log("S", newData);

const res = newData.reduce(
  (acc, line) =>
    acc +
    line.reduce((sum, pos) => {
      sum += pos.visible.length > 0 ? 1 : 0;
      return sum;
    }, 0),
  0
);
const edge = data.length * 4 - 4;
console.log("visible", res + edge);

const total = data.length ** 2;
console.log("total", total);

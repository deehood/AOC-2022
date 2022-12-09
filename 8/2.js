import * as fs from "fs";
const dataStrings = fs.readFileSync("data", "utf8").split("\n");
const data = dataStrings.map((x) => x.split(""));

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

const checkSide = () => {
  let line = [];

  for (let i = 1; i < newData.length - 1; i++) {
    line = newData[i];
    for (let j = 1; j < line.length; j++) {
      let k = 1;
      for (; k + j <= line.length - 2; k++) {
        if (parseInt(line[j].val) <= parseInt(line[j + k].val)) break;
      }
      newData[i][j].trees.push(k);
    }
  }
};

let newData = data.map((line, i1) =>
  line.map((_, i2) => {
    return { pos: i1.toString() + i2.toString(), val: line[i2], trees: [] };
  })
);

checkSide("W");
rot90();
checkSide("N");
rot90();
checkSide("E");
rot90();
checkSide("S");

const resArray = newData.map((line) =>
  line.map((item) => item.trees.reduce((product, next) => product * parseInt(next), 1))
);

const res = Math.max(...resArray.map((line) => Math.max(...line)));
console.log("res", res);

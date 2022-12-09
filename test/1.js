import * as fs from "fs";
const dataStrings = fs.readFileSync("data2", "utf8").split("\n");
let data = dataStrings.map((x) => x.split(""));

// transpose + reverse - not in place -> may need deep copy JSON.parse(JSON.stringify(T))
function rot90() {
  let line = data[0];
  let lineSize = line.length;

  let temp = [];
  let T = [];

  for (let i = 0; i < lineSize; i++) {
    line = data[i];
    for (let j = 0; j < data.length; j++) {
      temp.push(data[j][i]);
    }
    T.push(temp.flat().reverse());
    temp = [];
  }
  data = T;
}

console.log(data);
rot90();
console.log(data);

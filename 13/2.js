import * as fs from "fs";
const data = fs
  .readFileSync("data", "utf8")
  .split("\n")
  .filter((x) => x !== "")
  .map((x) => JSON.parse(x));

const isNumber = (x) => typeof x === "number";
const isArray = (x) => typeof x === "object";

const isCorrect = (l, r) => {
  if (isNumber(l) && isNumber(r)) {
    if (l < r) return 1;
    if (l > r) return -1;
    return 0;
  }

  if (isNumber(l) && isArray(r)) return isCorrect([l], r);
  if (isNumber(r) && isArray(l)) return isCorrect(l, [r]);

  if (isArray(l) && isArray(r)) {
    let i = 0;
    for (; i < Math.min(l.length, r.length); i++) {
      let res = isCorrect(l[i], r[i]);
      if (res === 1) return 1;
      if (res === -1) return -1;
    }

    if (l.length > r.length && r.length === i) return -1;
    if (r.length > l.length && l.length === i) return 1;
  }
};

let orderedData = [];
data.push([[2]]);
data.push([[6]]);
for (let i = 0; i < data.length; i++) {
  orderedData = data.sort((a, b) => isCorrect(b, a));
}

const res = orderedData.reduce((product, next, index) => {
  if (JSON.stringify(next) === "[[2]]" || JSON.stringify(next) === "[[6]]")
    return product * (index + 1);
  return product;
}, 1);
console.log("resp", res);

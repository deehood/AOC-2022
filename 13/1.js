import * as fs from "fs";
const data = fs
  .readFileSync("data", "utf8")
  .split("\n")
  .filter((x) => x !== "")
  .map((x) => JSON.parse(x));

const left = data.filter((_, index) => index % 2 === 0);
const right = data.filter((_, index) => index % 2 !== 0);
const correct = [];

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

for (let i = 0; i < left.length; i++) {
  if (isCorrect(left[i], right[i]) === 1) correct.push(i + 1);
}
console.log(correct);
const result = correct.reduce((sum, next) => sum + next, 0);
console.log("result", result);

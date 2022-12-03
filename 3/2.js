import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");

const isInAllGroups = (str) =>
  str.includes("0") && str.includes("1") && str.includes("2") ? true : false;

function check(group) {
  const map = {};
  group.map((str, indexString) => {
    [...str].map((letter) => {
      if (!map[letter]) map[letter] = "";
      map[letter] += indexString;
    });
  });

  return Object.entries(map).reduce((sum, current) => {
    if (isInAllGroups(current[1])) {
      sum =
        current[0].charCodeAt(0) > 96
          ? current[0].charCodeAt(0) - 96
          : current[0].charCodeAt(0) - 38;
    }
    return sum;
  }, 0);
}

const groups = data.length / 3;
let result = 0;
for (let i = 0; i < groups; i++) {
  result += check([data[i * 3], data[i * 3 + 1], data[i * 3 + 2]]);
}

console.log(result);

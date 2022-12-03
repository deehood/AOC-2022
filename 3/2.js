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

  for (let str of Object.entries(map)) {
    if (isInAllGroups(str[1]))
      return str[0].charCodeAt(0) > 96 ? str[0].charCodeAt(0) - 96 : str[0].charCodeAt(0) - 38;
  }
  return 0;
}

const groups = data.length / 3;
let result = 0;
for (let i = 0; i < groups; i++) {
  result += check([data[i * 3], data[i * 3 + 1], data[i * 3 + 2]]);
}

console.log(result);

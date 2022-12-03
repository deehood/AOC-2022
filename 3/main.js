import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");

const isMixed = (str) =>
  [...str].reduce((isMixed, next) => (isMixed = next !== str[0] ? true : false), false);

function check(str) {
  let map = {};
  [...str].map((letter, index) => {
    if (!map[letter]) map[letter] = "";
    map[letter] += index < str.length / 2 ? "a" : "b";
  });

  return Object.entries(map).reduce((sum, current) => {
    if (isMixed(current[1]))
      sum +=
        current[0].charCodeAt(0) > 96
          ? current[0].charCodeAt(0) - 96
          : current[0].charCodeAt(0) - 38;

    return sum;
  }, 0);
}

const result = data.reduce((sum, next) => sum + check(next), 0);

console.log(result);

import * as fs from "fs";

const data = fs.readFileSync("data", "utf8").split("\n");

//1

function game1(str) {
  switch (str[2]) {
    case "X":
      if (str[0] === "A") return 1 + 3;
      if (str[0] === "C") return 1 + 6;
      return 1;
    case "Y":
      if (str[0] === "B") return 2 + 3;
      if (str[0] === "A") return 2 + 6;
      return 2;
    case "Z":
      if (str[0] === "C") return 3 + 3;
      if (str[0] === "B") return 3 + 6;
      return 3;
    default:
      return 0;
  }
}

let result = data.reduce((acc, next) => acc + game1(next), 0);
console.log(result);

//2

function game2(str) {
  switch (str[2]) {
    case "X":
      if (str[0] === "A") return 3;
      if (str[0] === "C") return 2;
      return 1;
    case "Y":
      if (str[0] === "B") return 2 + 3;
      if (str[0] === "A") return 1 + 3;
      return 3 + 3;
    case "Z":
      if (str[0] === "C") return 1 + 6;
      if (str[0] === "B") return 3 + 6;
      return 2 + 6;
    default:
      return 0;
  }
}

result = data.reduce((acc, next) => acc + game2(next), 0);
console.log(result);

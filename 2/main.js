import * as fs from "fs";

const data = fs.readFileSync("data", "utf8").split("\n");
// const data = ["A Y", "B X", "C Z"];

function game(str) {
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

const result = data.reduce((acc, next) => acc + parseInt(game(next)), 0);
console.log(data);
console.log(result);
console.log(game(data[0]));

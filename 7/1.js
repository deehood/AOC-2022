import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");

const parseSize = (line) => line.match(/\d+/) | 0;

let sys = {};
let node = { files: 0, children: [] };
let current = [];

for (let line of data) {
  if (line.includes("$")) {
    if (line.includes("..")) {
      current.pop();
    } else {
      if (line.includes("cd ")) {
        current.push(line.replace("$ cd ", ""));

        node.children = [];
        node.files = 0;
      }
    }
  } else {
    if (line.includes("dir")) node.children.push([...current, line.replace("dir ", "")]);
    node.files += parseSize(line);
    sys[current] = { ...node };
  }
}

const sysArray = Object.entries(sys);

const getDirSize = (arr) =>
  sysArray.reduce((size, line) => {
    if (line[0].includes(arr)) size += line[1].files;
    return size;
  }, 0);

const result = sysArray
  .filter((line) => getDirSize(line[0]) < 100000)
  .reduce((sum, next) => {
    return (sum += getDirSize(next[0]));
  }, 0);

console.log("dirSize /", getDirSize(["/"]));
console.log(result);

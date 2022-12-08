import * as fs from "fs";
const data = fs.readFileSync("data", "utf8").split("\n");

console.log(data);

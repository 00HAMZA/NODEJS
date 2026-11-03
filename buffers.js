const buffer = Buffer.from("000");
const fs = require("node:fs");
const readFile = fs.readFileSync("products.txt");
console.log(readFile);
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());
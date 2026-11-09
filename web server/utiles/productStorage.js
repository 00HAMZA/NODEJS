const fs = require("node:fs/promises");
const path = require("node:path");

const filepath = path.join(__dirname, "../data/products.js");

async function readProducts() {
  const data = await fs.readFile(filepath, "utf8");
  return JSON.parse(data);
}

async function saveProduct(products) {
  const data = await fs.writeFile(filepath, JSON.stringify(products), "utf8");
}

module.exports = {saveProduct, readProducts};

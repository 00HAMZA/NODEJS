const products = require("../products");
function DELETE(req, res) {
  const parts = req.url.split("/");
  const id = Number(parts[2]);
  const filtred = products.filter((p) => p.id !== id);
  if (filtred.length === products.length) {
    res.writeHead(404, { contentType: "application/json" });
    res.end(JSON.stringify({ message: "product not found to delete !!" }));
    return;
  }
  products.length = 0;
  products.push(...filtred);
  res.writeHead(200, { contentType: "application/json" });
  return res.end(JSON.stringify(products));
}
module.exports = DELETE;
function PUT(req, res) {
  const parts = req.url.split("/");
  const id = Number(parts[2]);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    const update = products.find((p) => p.id === id);
    if (!update) {
      res.writeHead(404, { contentType: "application/josn" });
      return res.end(
        JSON.stringify({ message: "product not found to update !!" }),
      );
    }
    if (
      !data.name ||
      !data.name.trim() ||
      !Number.isFinite(Number(data.price))
    ) {
      res.writeHead(400, { contentType: "application/json" });
      return res.end(JSON.stringify({ message: "input user not valid !!" }));
    }
    update.name = data.name.trim();
    update.price = Number(data.price);
    res.writeHead(200, { contentType: "application/json" });
    return res.end(JSON.stringify(update));
  });
}
module.exports = PUT;
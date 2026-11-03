async function PATCH(req, res) {
  const parts = req.url.split("/");
  const id = Number(parts[2]);

  const product = products.find((p) => p.id === id);

  if (!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "product not found" }));
  }

  try {
    const body = await getRequestBody(req);
    const data = JSON.parse(body);

    const allowedfields = ["name", "price"];
    const fields = Object.keys(data);

    if (
      fields.length === 0 ||
      fields.some((field) => !allowedfields.includes(field))
    ) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "no valid fields to update" })
      );
    }

    if (
      data.name !== undefined &&
      (typeof data.name !== "string" || data.name.trim() === "")
    ) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "invalid product name" }));
    }

    if (
      data.price !== undefined &&
      (typeof data.price !== "number" ||
        !Number.isFinite(data.price) ||
        data.price <= 0)
    ) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "invalid price field" }));
    }

    if (data.name !== undefined) {
      product.name = data.name.trim();
    }

    if (data.price !== undefined) {
      product.price = data.price;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(product));

  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "invalid JSON body" }));
  }
}
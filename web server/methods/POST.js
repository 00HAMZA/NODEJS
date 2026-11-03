const getRequestBody = require("../requestBody");

async function POST(req, res) {
  try {
    const body = await getRequestBody(req);
    const data = JSON.parse(body);

    if (
      typeof data.name !== "string" ||
      data.name.trim() === "" ||
      typeof data.price !== "number" ||
      !Number.isFinite(data.price) ||
      data.price <= 0
    ) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "The input fields are not valid!" }),
      );
    }

    const newProduct = {
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      name: data.name.trim(),
      price: data.price
    };

    products.push(newProduct);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ message: "Invalid JSON or request body!" }),
    );
  }
}

module.exports = POST;


const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to the Products API!");

  } else if (req.method === "GET" && req.url === "/products") {
    const products = [
      { id: 1, name: "Laptop", price: 5000 },
      { id: 2, name: "Phone", price: 3000 },
      { id: 3, name: "Keyboard", price: 250 }
    ];

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(products));

  } else if (req.method === "GET" && req.url === "/products/2") {
    const product = {
      id: 2,
      name: "Phone",
      price: 3000
    };

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(product));

  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Route not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

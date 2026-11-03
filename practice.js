const http = require("node:http");
//=> {}
//&&
const products = [
  { id: 1, name: "Laptop", price: 5000 },
  { id: 2, name: "Phone", price: 3000 },
  { id: 3, name: "Keyboard", price: 250 },
  { id: 4, name: "Mouse", price: 150 },
  { id: 5, name: "Monitor", price: 1800 },
  { id: 6, name: "Gaming Laptop", price: 7500 },
  { id: 7, name: "iPhone", price: 6000 },
  { id: 8, name: "Samsung Phone", price: 2500 },
  { id: 9, name: "Headphones", price: 450 },
  { id: 10, name: "Mechanical Keyboard", price: 800 },
  { id: 11, name: "Tablet", price: 2200 },
  { id: 12, name: "USB Cable", price: 50 },
  { id: 13, name: "Webcam", price: 650 },
  { id: 14, name: "Gaming Mouse", price: 350 },
  { id: 15, name: "Smart Watch", price: 1200 },
];
function validateInput(name, price) {
  if (typeof name !== "string" || name.trim() === "") {
    return false;
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return false;
  }
}
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
function POST(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    if (
      typeof data.name !== "string" ||
      data.name.trim() === "" ||
      typeof data.price !== "number" ||
      !Number.isFinite(data.price) ||
      data.price <= 0
    ) {
      res.writeHead(400, { contentType: "application/json" });
      return res.end(
        JSON.stringify({ message: "the input filed not valid !!" }),
      );
    }
    const updated = products.push(data);
    res.writeHead(201, { contentType: "application/json" });
    return res.end(JSON.stringify({ message: "the product adds succefully " }));
  });
}
function PATCH(req, res) {
  const parts = req.url.split("/");
  const id = Number(parts[2]);
  const product = products.find((p) => p.id === id);

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    const allowedfields = ["name", "price"];
    const fields = Object.keys(data);
    if (
      fields.length === 0 ||
      fields.some((field) => !allowedfields.includes(field))
    ) {
      res.writeHead(400, { contentType: "application/json" });
      return res.end(JSON.stringify({ message: "no valid fields to update" }));
    }
    if (
      data.name !== undefined &&
      (typeof data.name !== "string" || data.name.trim() === "")
    ) {
      res.writeHead(400, { contentType: "application/json" });
      return res.end(
        JSON.stringify(JSON.stringify({ message: "invalid product name" })),
      );
    }
    if (
      data.price !== undefined &&
      (typeof data.price !== "number" ||
        !Number(isFinite(data.price) || data.price <= 0))
    ) {
      res.writeHead(400, { contentType: "application/json" });
      res.end(JSON.stringify({ message: "invalid price field" }));
      return;
    }
    if (data.name !== undefined) {
      product.name = data.name.trim();
    }
    if (data.price !== undefined) {
      product.price = data.price;
    }
    res.writeHead(201, {"contentType": "application/json"});
    res.end(JSON.stringify(product));
  });
}
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost:3000");

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("welcome to my apis");
  } else if (req.url === "/about" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("this is about");
  } else if (req.url === "/contact" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("contact page");
  } else if (req.method === "GET" && url.pathname === "/products") {
    if (validateInput === false) {
      res.writeHead(400, { contentType: "application/json" });
      res.end(JSON.stringify({ message: "input not valid !!" }));
      return;
    }
    ///////////////////////////////////////
    console.log("test:   ", url.search);
    console.log("test 2 : ", url.pathname);
    console.log("test 3: ", url.searchParams.has("search"));
    console.log("test 4:", url.searchParams.getAll("name"));
    /////////////////////////////////////////
    const minprice = url.searchParams.get("minprice");
    const maxprice = url.searchParams.get("maxprice");
    const sort = url.searchParams.get("sort");
    const limit = url.searchParams.get("limit");
    const search = url.searchParams.get("search");
    let result = products;
    if (search !== null) {
      result = result.filter((p) =>
        p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
    }
    if (maxprice !== null) {
      result = result.filter((p) => p.price <= Number(maxprice));
    }
    if (minprice !== null) {
      result = result.filter((p) => p.price >= Number(minprice));
    }
    if (sort !== null) {
      if (sort === "asc") {
        result = [...result].sort((a, b) => a.price - b.price);
      } else if (sort === "desc") {
        result = [...result].sort((a, b) => b.price - a.price);
      }
    }
    if (limit !== null) {
      result = result.slice(0, Number(limit));
    }
    res.writeHead(200, { contentType: "application/json" });
    res.end(JSON.stringify(result));
  } else if (req.method === "GET" && req.url.startsWith("/products/")) {
    const parts = req.url.split("/");
    const id = Number(parts[2]);
    const product = products.find((p) => p.id === id);
    if (!product) {
      res.writeHead(401, { contentType: "application/json" });
      res.end(JSON.stringify({ message: "product not found !!" }));
      return;
    }
    res.writeHead(200, { contentType: "applicatipn/json" });
    res.end(JSON.stringify(product));
  } else if (req.method === "PUT" && req.url.startsWith("/products/")) {
    PUT(req, res);
  } else if (req.method === "DELETE" && req.url.startsWith("/products/")) {
    DELETE(req, res);
  } else if (req.method === "POST" && req.url === "/products") {
    POST(req, res);
  } else if (req.method === "PATCH" && req.url.startsWith("/products/")) {
    PATCH(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(JSON.stringify({ message: "page not found" }));
  }
});

server.listen(3000, () => {
  console.log("listening ...");
});

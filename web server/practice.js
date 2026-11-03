const http = require("node:http");
const products = require("./products");
const PUT = require("./methods/PUT");
const DELETE = require("./methods/DELETE");
const POST = require("./methods/POST");
const PATCH = require("./methods/PATCH"); 

//=> {}
//&&

function validateInput(name, price) {
  if (typeof name !== "string" || name.trim() === "") {
    return false;
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return false;
  }
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

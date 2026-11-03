const http = require("node:http");
//{}
//&&
//[]
const products = [
  { id: 1, name: "Laptop", price: 5000 },
  { id: 2, name: "Phone", price: 3000 },
  { id: 3, name: "Keyboard", price: 250 },
];
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/products") {
    ((res.statusCode = 200),
      res.setHeader("contentType", "application/json"),
      res.end(JSON.stringify(products)));
  } else if (req.method === "GET" && req.url.startsWith("/products/")) {
    const parts = req.url.split("/");
    const id = Number(parts[2]);
    const product = products.find((p) => p.id === id);
    if(product){
        res.statusCode = 200,
        res.setHeader("contentType", "application/json"),
        res.end(JSON.stringify(product));
    }else{
        res.statusCode = 404,
        res.setHeader("contentType", "application/json"),
        res.end(JSON.stringify({message : "product not found"}))
    }
  }else{
    res.statusCode = 404,
    res.setHeader("contentType", "application/json"),
    res.end(JSON.stringify({message : "route not found"}));
  }
});

server.listen(3000, () => {
  console.log("the server listenning to the port 3000");
});

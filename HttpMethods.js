const http = require("node:http");
const { json } = require("node:stream/consumers");
//{}
//&&
//[]
const products = [
  { id: 1, name: "Laptop", price: 5000 },
  { id: 2, name: "Phone", price: 3000 },
  { id: 3, name: "yess", price: 1000 }
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/products") {
    ((res.statusCode = 200),
      res.setHeader("contentType", "application/json"),
      res.end(JSON.stringify(products)));
  } else if (req.method === "GET" && req.url.startsWith("/products/")) {
    const parts = req.url;
    const id = parts.split("/");
    const idNumber = Number(id[2]);

    if (!Number.isInteger(idNumber) || idNumber <= 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Invalid product ID" }));
      return;
    }

    const product = products.find((p) => p.id === idNumber);

    if (!product) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Product not found" }));
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(product));
  } else if (req.method === "PUT" && req.url.startsWith("/products/")) {
    const url = req.url;
    const id = url.split("/");
    const numberID = Number(id[2]);
    const product = products.find((p) => p.id === numberID);

    console.log("the product before editing : ", product);

    if (!product) {
      res.statusCode = 404;
      res.setHeader("contentType", "application/json");
      res.end(JSON.stringify({ message: "product not found" }));
      return;
    }

    let bodyy = "";

    req.on("data", (chunk) => {
      bodyy += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(bodyy);
        product.name = data.name;
        product.price = data.price;
        res.statusCode = 200;
        res.setHeader("contentType", "application/json");
        res.end(JSON.stringify(product));
        console.log("the product after editing :", bodyy);
      } catch {
        res.statusCode = 400;
        res.setHeader("contentType", "application/json");
        res.end(JSON.stringify({ message: "invalid json" }));
      }
    });

    return;
  } else if (req.method === "POST" && req.url === "/products") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10000) {
        ((res.statusCode = 413),
          res.end("request body too large"),
          res.destroy());
        return;
      }
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (res.writableEnded) return;

        if (
          typeof data.name !== "string" ||
          data.name.trim() === "" ||
          typeof data.price !== "number" ||
          !Number.isFinite(data.price) ||
          data.price < 0
        ) {
          ((res.statusCode = 400),
            res.setHeader("contentType", "application/json"));

          res.end(
            JSON.stringify({
              message: "valid name and non negative price are require ",
            }),
          );
          return;
        }

        const newProduct = {
          id: Math.max(0, ...products.map((p) => p.id)) + 1,
          name: data.name.trim(),
          price: data.price,
        };

        products.push(newProduct);

        ((res.statusCode = 201),
          res.setHeader("contentType", "application/json"),
          res.end(JSON.stringify(products)));
      } catch (error) {
        if (res.writableEnded) return;

        ((res.statusCode = 400),
          res.setHeader("contentType", "application/json"),
          res.end(JSON.stringify({ message: "invalid JSON" })));

        return;
      }

      return;
    });

    return;
  } else if (req.method === "PATCH" && req.url.startsWith("/products/")) {
    const url = req.url.split("/");
    const id = Number(url[2]);

    const product = products.find((p) => p.id === id);

    if (!product) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Product not found" }));
      return;
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        if (data.name !== undefined) {
          product.name = data.name;
        }

        if (data.price !== undefined) {
          product.price = data.price;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(product));
      } catch (error) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/products/")) {
    const url = req.url;
    const Fullid = url.split("/");
    const id = Number(Fullid[2]);
    productsFiltred = products.filter((p)=> p.id !== id);
    if(!products){
        res.statusCode = 404;
        res.setHeader("typeContent", "application/json");
        res.end({message: "the product for delete not found"});
        return;
    }
    res.statusCode = 201;
    res.setHeader("contentType", "application/json");
    res.end(JSON.stringify(productsFiltred));
  }
});
server.listen(3000, () => {
  console.log("the server listenning to the port 3000");
});

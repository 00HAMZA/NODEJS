const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} = require("../controllers/productsController");
const { authentication } = require("../middlewares/logger");
const { Worker } = require("worker_threads");
const path = require("node:path");

function productRoutes(req, res) {
  const url = new URL(req.url, "http://localhost:3000");
  if (req.method === "GET" && url.pathname === "/worker") {
    const worker = new Worker(
      path.resolve(__dirname, "../workers/parentport.js"),
    );
    worker.on("message", (data) => {
      res.end(`result : ${data}`);
    });
    worker.on("error", (err) => {
      res.writeHead(400, { contentType: "application/text" });
      res.end(`and error of worker : ${err}`);
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/products") {
    return getAllProducts(req, res);
  }

  if (req.method === "GET" && url.pathname.startsWith("/products/")) {
    return getProductById(req, res);
  }

  if (req.method === "POST" && url.pathname === "/products") {
    return authentication(req, res, () => {
      createProduct(req, res);
    });
  }
  if (req.method === "PUT" && url.pathname.startsWith("/products/")) {
    return updateProduct(req, res);
  }

  if (req.method === "PATCH" && url.pathname.startsWith("/products/")) {
    return patchProduct(req, res);
  }

  if (req.method === "DELETE" && url.pathname.startsWith("/products/")) {
    return deleteProduct(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ message: "Route not found" }));
}

module.exports = productRoutes;

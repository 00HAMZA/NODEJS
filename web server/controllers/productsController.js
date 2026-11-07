const productService = require("../services/productService");
const getRequestBody = require("../utiles/getRequestbody");

// GET ALL PRODUCTS
function getAllProducts(req, res) {
  const url = new URL(req.url, "http://localhost:3000");

  const filters = {
    minprice: url.searchParams.get("minprice"),
    maxprice: url.searchParams.get("maxprice"),
    sort: url.searchParams.get("sort"),
    limit: url.searchParams.get("limit"),
    search: url.searchParams.get("search"),
  };

  const result = productService.getAllProducts(filters);

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(result));
}

// GET PRODUCT BY ID
function getProductById(req, res) {
  const url = new URL(req.url, "http://localhost:3000");
  const id = Number(url.pathname.split("/")[2]);

  const product = productService.getProductById(id);

  if (!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "product not found" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(product));
}

// CREATE PRODUCT
async function createProduct(req, res) {
  try {
    const body = await getRequestBody(req);
    const data = JSON.parse(body);

    const product = productService.createProduct(data);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(product));
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: error.message }));
  }
}

// UPDATE PRODUCT
async function updateProduct(req, res) {
  try {
    const url = new URL(req.url, "http://localhost:3000");
    const id = Number(url.pathname.split("/")[2]);

    const body = await getRequestBody(req);
    const data = JSON.parse(body);

    const product = productService.updateProduct(id, data);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "product not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(product));
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: error.message }));
  }
}

// PATCH PRODUCT
async function patchProduct(req, res) {
  try {
    const url = new URL(req.url, "http://localhost:3000");
    const id = Number(url.pathname.split("/")[2]);

    const body = await getRequestBody(req);
    const data = JSON.parse(body);

    const product = productService.patchProduct(id, data);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "product not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(product));
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: error.message }));
  }
}

// DELETE PRODUCT
function deleteProduct(req, res) {
  const url = new URL(req.url, "http://localhost:3000");
  const id = Number(url.pathname.split("/")[2]);

  const deleted = productService.deleteProduct(id);

  if (!deleted) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "product not found" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ message: "product deleted successfully" }));
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
const products = require("../data/products");

// GET ALL PRODUCTS
function getAllProducts(filters) {
  let result = [...products];

  const { minprice, maxprice, sort, limit, search } = filters;

  if (search !== null) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (maxprice !== null) {
    result = result.filter((p) => p.price <= Number(maxprice));
  }

  if (minprice !== null) {
    result = result.filter((p) => p.price >= Number(minprice));
  }

  if (sort === "asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    result.sort((a, b) => b.price - a.price);
  }

  if (limit !== null) {
    result = result.slice(0, Number(limit));
  }

  return result;
}

// GET PRODUCT BY ID
function getProductById(id) {
  return products.find((p) => p.id === id);
}

// CREATE PRODUCT
function createProduct(data) {
  if (
    typeof data.name !== "string" ||
    data.name.trim() === "" ||
    typeof data.price !== "number" ||
    !Number.isFinite(data.price) ||
    data.price <= 0
  ) {
    throw new Error("Invalid product data");
  }

  const newProduct = {
    id: Math.max(0, ...products.map((p) => p.id)) + 1,
    name: data.name.trim(),
    price: data.price,
  };

  products.push(newProduct);

  return newProduct;
}

// REPLACE PRODUCT
function updateProduct(id, data) {
  const product = products.find((p) => p.id === id);

  if (!product) {
    return null;
  }

  if (
    typeof data.name !== "string" ||
    data.name.trim() === "" ||
    typeof data.price !== "number" ||
    !Number.isFinite(data.price) ||
    data.price <= 0
  ) {
    throw new Error("Invalid product data");
  }

  product.name = data.name.trim();
  product.price = data.price;

  return product;
}

// PARTIALLY UPDATE PRODUCT
function patchProduct(id, data) {
  const product = products.find((p) => p.id === id);

  if (!product) {
    return null;
  }

  const allowedFields = ["name", "price"];
  const fields = Object.keys(data);

  if (
    fields.length === 0 ||
    fields.some((field) => !allowedFields.includes(field))
  ) {
    throw new Error("No valid fields to update");
  }

  if (
    data.name !== undefined &&
    (typeof data.name !== "string" || data.name.trim() === "")
  ) {
    throw new Error("Invalid product name");
  }

  if (
    data.price !== undefined &&
    (typeof data.price !== "number" ||
      !Number.isFinite(data.price) ||
      data.price <= 0)
  ) {
    throw new Error("Invalid product price");
  }

  if (data.name !== undefined) {
    product.name = data.name.trim();
  }

  if (data.price !== undefined) {
    product.price = data.price;
  }

  return product;
}

// DELETE PRODUCT
function deleteProduct(id) {
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);

  return true;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
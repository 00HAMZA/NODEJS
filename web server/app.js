const http = require("node:http");
const productRoutes = require("./routes/productRoutes");

const server = http.createServer((req, res) => {
  productRoutes(req, res);
});

server.listen(3000, () => {
  console.log("listening ...");
});
startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

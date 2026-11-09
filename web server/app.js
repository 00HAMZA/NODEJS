const http = require("node:http");
const { logger, requestInfo, authentication } = require("./middlewares/logger");
const runMiddleware = require("./middlewares/runMiddleware");
const productRoutes = require("./routes/productRoutes");

const server = http.createServer((req, res) => {
    const middlwares = [ logger, requestInfo, authentication];
    runMiddleware(middlwares, req, res, productRoutes);
});

server.listen(3000, () => {
  console.log("listening ...");
});
    
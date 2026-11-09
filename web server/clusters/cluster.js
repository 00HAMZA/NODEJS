const cluster = require("node:cluster");
const os = require("node:os");
const http = require("node:http");

const numCPUs = os.availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary process: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const server = http.createServer((req, res) => {
    res.end(`Hello from worker ${process.pid}`);
  });

  server.listen(3000, () => {
    console.log(`Worker ${process.pid} is running`);
  });
}

const http = require("node:http");
const { logger, requestInfo, authentication } = require("./middlewares/logger");
const runMiddleware = require("./middlewares/runMiddleware");
const productRoutes = require("./routes/productRoutes");
const  {fork, ChildProcess} = require("node:child_process");

const child = fork("./childProcess/reportWorker.js");

child.send( {
    totalsales : 2000,
    totalorders : 1000
});
child.on("message", (result) =>{
    console.log("report result: ", result);
})
const server = http.createServer((req, res) => {
    const middlwares = [ logger, requestInfo, authentication];
    runMiddleware(middlwares, req, res, productRoutes);
});

server.listen(3000, () => {
  console.log("listening ...");
});

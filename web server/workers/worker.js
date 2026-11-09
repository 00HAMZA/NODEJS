const { Worker, parentPort } = require("node:worker_threads");

const worker = new Worker("./parentport.js");

worker.on("message", (result) => {
  console.log("Result:", result);
});

worker.on("error", (error) => {
  console.log("Worker error:", error);
});

worker.on("exit", (code) => {
  console.log("Worker stopped:", code);
});

console.log("Main thread is still working!");

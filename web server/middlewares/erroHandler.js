const ErrorClass = require("../Erros/ErrorClass");

function errorHandler(err, req, res) {
  const statusCode = err.statusCode || 500;

  const message = err.isOperational
    ? err.message
    : "Internal Server Error";

  res.writeHead(statusCode, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    status: "error",
    message: message
  }));
}

module.exports = errorHandler;
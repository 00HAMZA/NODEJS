function errorHandler(err, res, req) {
  const statuscode = err.statuscode || 500;
  const message = err.isOperational ? err.message : "internal server Error";
  res.writeHead(statuscode, { contentType: "application/json" });
  res.end(JSON.stringify({ status: "error", message: message }));
}
module.exports = errorHandler;
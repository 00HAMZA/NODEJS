const appError = require("../Erros/ErrorClass");

function logger(req, res, next) {
  console.log("loggerr ::");
  next();
}
function authentication(req, res, next) {
  const token = req.headers.authorization;
  console.log("recaived token :", token);
  if (!token) {
    return next(new appError("You are not authenticated", 401));
  }

  next();
}
function requestInfo(req, res, next) {
  console.log("request info ::");
  next();
}
module.exports = { logger, requestInfo, authentication };

const AppError = require("../Erros/ErrorClass");
const getRequestBody = require("../utiles/getRequestbody");

async function bodyParser(req, res, next) {
  try {
    const data = await getRequestBody(req);
    req.body = data;
    next();
  } catch (err) {
    return next(new AppError("invalid Json body", 400));
  }
}
module.exports = bodyParser;
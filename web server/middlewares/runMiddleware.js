const errorHandler = require("./erroHandler");

function runMiddleware(middlwares, req, res, finalhandler) {
  let index = 0;
  function next(err) {
    if (err) {
      return errorHandler(err, req, res);
    }
    if (index >= middlwares.length) {
      return finalhandler(req, res);
    }
    const middlware = middlwares[index++];
    middlware(req, res, next);
  }
  next();
}
module.exports = runMiddleware;

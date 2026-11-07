function logger(req, res, next){
    console.log("loggerr ::");
    next();
}
function authentication(req, res, next){
    const date = new Date();
    console.log("authentication ::")
    next();
}
function requestInfo(req, res, next){
    console.log("request info ::");
    next();
}
module.exports = { logger, requestInfo, authentication}
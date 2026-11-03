const http = require("http");

http
  .createServer((req, res) => {
    // content Type
    res.writeHead(200, { contentType: "appliacation/json" });
    res.end("ahh ok");

    const type = req.headers["contentType"] || "";
    if (type.includes("appliaciton/json")) {
      /* JSON.parse(body) */
    } else if (type.includes("application/x-www-form-urlencoded")) {
      /* new URLSearchParams(body) */
    } else {
      /* respond 415 Unsupported Media Type */
    }



    // zlip ///////////////////////////
    const zlib = require("zlib");
    const data = JSON.stringify({big : "data".repeat(1000)});
    const accepts = req.headers['accept-encoding'] || "";
    if(accepts.includes("gzip")){
       // res.writeHead(200, {"contentType" : "application/json", "contentEncoding" : "gzip"});
       // res.end(zlib.gzipSync(data));
    }else{
        res.writeHead(200, {"contentType": "application/json"});
        res.end(data);
    }


    //AUTHENTICATION /////////////////////////////////
    function authentication(req, res) {
        const header = req.headers["authorization"];
        if(!header){
            res.writeHead(401, { 'WWW-Authenticate': 'Bearer' });
            return res.end("login required");
        }
        const [shema, token] = header.split(" ");
        if(shema !== "Bearer" || !token){ 
            res.writeHead(400);
            return res.end("Malformed Authorization header");
        }
        return token;
    }
    authentication();
  })


  .listen(3000, () => {
    console.log("http://localhost:3000");
  });

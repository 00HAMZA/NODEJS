const http = require('node:http');
//{}
//&&
//[]
const server = http.createServer((req, res)=> {
    if(req.method === "GET" && req.url === "/"){
        console.log("request header", req.headers["user-agent"]);
        res.statusCode === 200;
        res.setHeader("contentType", "text.plain"),
        res.end("welcome to my API !!");
    } else if(req.method === "GET" && req.url === "/products"){
        const products = [
            {id : 1, name : "laptop", price : 3000},
            {id : 1, name : "phone", price : 2000}
        ]
        res.statusCode === 200;
        res.setHeader("contentType", "text/plain");
        res.end(JSON.stringify(products));
    }else{
        res.statusCode === 404;
        res.setHeader("contentType", "text/plain");
        res.end("route not found !!");
    }
});

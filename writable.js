const fs = require("fs");
const http = require("http")
const { createServer } = require("http");
const { Writable, Readable } = require("stream");
//{}
//&&
//[]

const server = http.createServer((req, res)=> {
    const writable = fs.writeFileSync("link.html");
    const readable = fs.writeFileSync("products.html");
    const data = fs.readFileSync("products.html");
    const chunks = fs.createReadStream("products.html");
    //solves hte problem if was the read fats than the write
    /*chunks.on("data", (chunk)=> {
        const ok = writable.write(chunk);
        if(!ok){
            readable.pause();
            writable.once("drain", ()=> readable.resume());
        }
    })*/
    //and we can also use pipe or pipeline (it does the same job)
   // chunks.on("data").pipe(res);
})
const listen = server.listen(3000, ()=> {
    console.log("the erver are listennign now !!");
});




let body = 0;
const toto = fs.createReadStream("products.html").on("data", (chunk)=> {
    body += chunk;
    
}).on("end", ()=> console.log("total bytes:", body));
const papa = fs.createReadStream("products.html");
papa.pipe(res);
req.on("close", () => papa.unpipe(res)) 
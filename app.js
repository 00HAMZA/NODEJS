const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from back");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


//os
const os = require('os');
const totalmem = os.totalmem();
console.log(totalmem /1024 /1024 /1024);
const freemem = os.freemem();
console.log(freemem / 1024 / 1024 /1024);
const cpus = os.cpus();
console.log(cpus[0].model);
const networkinfo = os.networkInterfaces();
console.log(Object.keys(networkinfo))



//fs 
const fs = require('node:fs/promises');
const writing = fs.writeFile('test.js', 'hello');
const append = fs.appendFile('test.js', ' world');
//console.log( await fs.readFile('test.js', 'utf8'));



//path
const path = require('node:path');
const a = 'text.txt';
const b = 'windows.png'
console.log(path.join(a, b));
console.log(path.resolve(a, b));
console.log(path.dirname(a));
console.log(path.extname(b));
console.log(path.parse(b));
console.log(path.normalize(a));
//the important thigns in the path cpmmands (__dirname and __filename)
const configPath = path.join(__dirname, 'completed.js');
console.log(`for the directory to the root : ${__dirname}`);
console.log(`for the current file to the root : ${__filename}`);
console.log(configPath);


//process
//console.log(process.env);



//http
const http = require('node:http');
const server = http.createServer((req, res)=> {
  res.statusCode = 200;
  res.setHeader('contentType', 'application.json');
  res.end(JSON.stringify({ message: 'Hello' }));
})
server.listen(3000, ()=> console.log('running on the port 3000'));

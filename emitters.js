const eventEmitter = require("node:events");

const myemitter = new eventEmitter();

myemitter.once("loggedIn", (product)=> {
    console.log("product logged", product);
}).once("loggedout", (product)=> {
    console.log("product not found");
})

const product = {
    name: "hahasni",
    password : "HASham2003"
}
myemitter.emit("loggedout", product);
myemitter.emit("loggedout", product);
myemitter.emit("loggedout", product);
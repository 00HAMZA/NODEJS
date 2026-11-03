// in this example the promise has the highest priority of the code execution of the async execution
//because she is a part of the microtask queues
// and the timer follow it immediately 
/*console.log("start");
setTimeout(() =>{
    console.log("timer finished")
}, 0);
Promise.resolve().then(()=>{
    console.log("promise finished")
})
console.log("end");*/

/*let counter = 0;
const intervalid = setInterval((message) => {
    counter++;
    console.log(`${message} Count: ${counter}`);
    if(counter === 4){
        clearInterval(intervalid);
        console.log("interval stopped");
    }
}, 1000, "runnig periodic...");*/

const { error } = require("node:console");
const fs = require("node:fs");
console.log("start.");
Promise.resolve("data loading").then((result) =>{
    console.log(result)
}).catch((error) =>{
    console.log("error", error);
}).finally(() =>{
    console.log("finished.")
})
process.nextTick(() =>{
    console.log("next tick.");
})
fs.readFile("products.txt", "utf8", (error, data)=>{
    if(error){
        console.log("error: ", error);
        return
    }
    console.log("data: ", data);
})
console.log("end.")




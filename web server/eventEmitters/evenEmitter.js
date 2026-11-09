const eventEmitter = require("node:events");
const { emit } = require("node:process");
const emitter = new eventEmitter();

function sayHello() {
  console.log("say hello");
}
emitter.on("orderCreated", () => {
  console.log("1");
});
//emitter.off("orderCreated", sayHello);
emitter.once("orderCreated", () => {
  console.log("2");
});
emitter.on("orderCreated", () => {
  console.log("3");
});

/*emitter.emit("orderCreated");
emitter.emit("orderCreated");
emitter.emit("orderCreated");
//emitter.removeAllListeners("orderCreated");
console.log(emitter.listenerCount("orderCreated"));
console.log(emitter.eventNames());
console.log(emitter.listeners());
console.log(emitter.setMaxListeners(10));*/

function sendNotification() {
  console.log("notification sent !!");
}
for (let i = 0; i < 1000; i++) {
  emitter.on("notification", sendNotification);
}

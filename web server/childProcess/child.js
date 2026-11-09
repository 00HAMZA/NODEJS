const { exec, spawn, fork } = require("node:child_process");
const { error } = require("node:console");
const { stdout, stderr } = require("node:process");

console.log("chil process starts ");

exec("node --version", (err, stdout, stderr) => {
  if (err) {
    console.log("error : ", err.message);
  }
  if (stderr) {
    console.log("stderr: ", stderr);
  }
  console.log("stdout: ", stdout);
});
exec("touch test.txt", (error, stdout, stderr) => {
  if (error) {
    console.log("error", error.message);
  }
  if (stderr) {
    console.log("stderr: ", stderr);
  }
  console.log("the output :", stdout, "////////////////////");
});
const child = spawn("cmd", ["/c", "dir"]);
child.stdout.on("data", (chunk) => {
  console.log("spawn output: ", chunk.toString(), "////////////////////");
});
child.stderr.on("data", (chunk) => {
  console.log("Error spawn output: ", chunk.toString());
});
child.on("close", (code) => {
  console.log("Child process finished with code:", code);
});
console.log("parent process continious ...");



let result = 0;

for(let i = 1; i <= 1000000000; i++){
    result += i;
}

parentPort.postMessage(result);
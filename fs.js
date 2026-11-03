const fs = require('node:fs/promises');
const {readFile, writeFile} = require('fs');

//const data =  fs.readFile('test.txt', 'utf8');   // read
// fs.writeFile('test.txt', 'Hello');                // write
 //fs.unlink('test.txt');                            // delete
//console.lollg(data);

readFile('test.txt','utf8' ,(err, res)=> {
  if(err){
    console.log('the content doseont found');
    return 
  }
  console.log(res);
})

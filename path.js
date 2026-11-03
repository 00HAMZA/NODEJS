const path = require('node:path');

const fullPath = path.join(__dirname, 'uploads', 'photo.png'); //link the file with full path
const extName = path.extname('test.txt');
const baseName = path.basename('C:\Users\hamza\nodeLearning\\photo.png');

//console.log(`before : 'uploads','photo.png' , after :${fullPath}`);
//console.log(`before : test.txt, after :${extName}`);
//console.log(`before : 'C:\Users\hamza\nodeLearning\\photo.png'  , after :${baseName}`);

const filepath = path.join('/content', 'subfolder', 'test.txt');
console.log(filepath);

const basename = path.basename(filepath)
console.log(baseName)
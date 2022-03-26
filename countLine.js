const { createInterface } = require('readline');
const { createReadStream } = require('fs');

let linesCount = 0;
//create interface
const rl = createInterface({
    //read file
    input: createReadStream('./text/lorem.txt'),
    //output in stdout
    output: process.stdout,
    terminal: false
});
rl.on('line', line => {
    linesCount++
});
//close and print result
rl.on('close', () => {
    console.log(linesCount);
});
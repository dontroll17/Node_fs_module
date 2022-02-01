const { createInterface } = require('readline');
const { createReadStream } = require('fs');

//command line argument as file path to read
//or lorem.txt as default
const file = process.argv[2] || 'lorem.txt';

const rl = createInterface({
    input: createReadStream(`${file}`),
    output: process.stdout,
    terminal: false
});

rl.on('line', line => {
    console.log(line);
})
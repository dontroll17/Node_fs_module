const { createInterface } = require('readline');
const { appendFile } = require('fs/promises');
//create new interface
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});
//listen to an event
rl.on('line', line => {
    //cache the line
	let copy = line;
    //write line in file
    appendFile('./text/stdout.txt', `${copy}\n`);
});

rl.on('close', () => {
	console.log('Close interface');
});
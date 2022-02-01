const { createReadStream, createWriteStream } = require('fs');

const read = createReadStream(`${__dirname}/hello.txt`,
    { encoding: 'utf-8', highWaterMark: 16 * 1024 });

const write = createWriteStream(`${__dirname}/out.txt`);

read.pipe(write);
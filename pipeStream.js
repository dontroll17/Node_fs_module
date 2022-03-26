const { createReadStream, createWriteStream } = require('fs');

const read = createReadStream(`${__dirname}/text/hello.txt`,
    { encoding: 'utf-8', highWaterMark: 16 * 1024 });

const write = createWriteStream(`${__dirname}/text/out.txt`);

read.pipe(write);
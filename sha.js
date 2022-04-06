/*
** Prints one line for each file in the available 
** folder: file name, available SHA-256 value 
** from file in hex.
*/
const { createReadStream, statSync } = require('fs');
const { readdir} = require('fs/promises');
const crypto = require('crypto');

const getHah = (filename, data) => {
    const hash = crypto
                    .createHash('sha256')
                    .update(Buffer.from(data))
                    .digest('hex');

    console.log(`${filename} ${hash}`);
}

const readStreamPromise = (stream) => {
    const readStream = createReadStream(stream);
    const data = [];
    return new Promise((resolve, reject) => {
        readStream.on('data', chunk => data.push(chunk));
        readStream.on('end', () => resolve(data));
        readStream.on('error', err => reject(err));
    });
}

const processEntry = async(stream) => {
    if(statSync(stream).isDirectory()) return;
    try {
        let data = await readStreamPromise(stream);
        getHah(stream, data);
    }
    catch(e) {
        console.error(e);
    }
} 

(async() => {
    try {
        const files = await readdir(__dirname);
        for(let file of files){
            processEntry(file);
        }
    }
    catch(e) {
        console.error(e);
    }
})();

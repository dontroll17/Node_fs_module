/*
** Prints one line for each file in the available 
** folder: file name, available SHA-256 value 
** from file in hex.
*/
const { createReadStream } = require('fs');
const { readdir, stat } = require('fs/promises');
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
        const arrOfFiles = []
        for(let i = 0; i < files.length; i++){
        	const check = await stat(files[i])
            if(check.isFile()) arrOfFiles.push(files[i])
        }
        for(let file of arrOfFiles){
            processEntry(file);
        }
    }
    catch(e) {
        console.error(e);
    }
})();

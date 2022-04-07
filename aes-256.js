const { randomBytes, createCipheriv, createDecipheriv } = require('crypto');
const { readFile } = require('fs/promises');

const alg = 'aes-256-cbc';

const initVector = randomBytes(16);
const securityKey = randomBytes(32);

(async() => {
    try {
        const data = await readFile('./text/hello.txt', 'utf-8');
        const message = data;

        const cipher = createCipheriv(alg, securityKey, initVector);

        let encryptedData = cipher.update(message, 'utf-8', 'hex');

        encryptedData += cipher.final('hex');

        console.log(`Encrypted message: ${encryptedData}`);

        const decipher = createDecipheriv(alg, securityKey, initVector);

        let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');

        decryptedData +=decipher.final('utf-8');

        console.log(`Decrypted message: ${decryptedData}`);
    }
    catch(e) {
        console.error(e);
    }
})();

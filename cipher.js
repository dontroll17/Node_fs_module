const { createReadStream, createWriteStream } = require('fs');
const { scrypt, randomFill, createCipheriv} = require('crypto');
const { pipeline } = require('stream');

/*
* First, we'll generate the key. The key length is dependent on the algorithm.
* In this case for aes192, it is 24 bytes (192 bits).
* Then, we'll generate a random initialization vector
*/

const algorithm = 'aes-192-cbc';
const password = 'Password';
const salt = 'salt';
const len = 24;

scrypt(password, salt, len, (err, key) => {
	err && console.error(err);

	randomFill(new Uint8Array(16), (err, iv) => {
		err && console.error(err);

		const cipher = createCipheriv(algorithm, key, iv);
		const inputStream = createReadStream('./text/lorem.txt');
		const outputStream = createWriteStream('./text/lorem.enc');

		pipeline(inputStream, cipher, outputStream, err => {
			err && console.error(err);
		});
	});
});
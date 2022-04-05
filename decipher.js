const { createReadStream, createWriteStream } = require('fs');
const { scrypt, randomFill, createDecipheriv } = require('crypto');
const { pipeline } = require('stream');


const algorithm = 'aes-192-cbc';
const password = 'Password';
const salt = 'salt';
const len = 24;

scrypt(password, salt, len, (err, key) => {
	err && console.error(err);

	randomFill(Buffer.alloc(16, 0), (err, iv) => {
		err && console.error(err);

		const decipher = createDecipheriv(algorithm, key, iv);
		const inputStream = createReadStream('./text/lorem.enc');
		const outputStream = createWriteStream('./text/lorem1.txt');

		pipeline(inputStream, decipher, outputStream, err => {
			err && console.error(err);
		});
	});
});
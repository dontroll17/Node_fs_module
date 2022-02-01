const { readFile } = require('fs/promises');

try{
    const r = readFile('hello.txt', 'utf-8');
    r.then(data => console.log(data));
}catch(e){
    console.error(e);
}

const { mkdir } = require('fs/promises');

const makeDir = async () => {
    await mkdir('testDir');
}

makeDir().then( () => {
    console.log('Success');
}).catch(() => {
    console.log('failed');
});
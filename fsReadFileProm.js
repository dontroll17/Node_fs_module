const { readFile } = require('fs/promises');

(async() => {
	try{
	    const data = await readFile('./text/hello.txt', 'utf-8');
	    console.log(data);
	}
	catch(e){
	    console.error(e);
	}	
})();


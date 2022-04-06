const { watch } = require('fs');

const file = './text/hello.txt';

watch(file, (event) => {
		console.log(event);
		if(event === "rename"){
			console.log(`file was rename or delete`);
		}else if(event === 'change'){
			console.log('file was changed');
		}
	});
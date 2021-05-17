const express = require('express');
const path = require('path');

const port = 3000
const app = express();


// setup static and middleware
app.use(express.static('./public'));

app.get('/view', (req, res) => {
//	res.status(200).send('Hello world');
	res.status(200).sendFile(path.resolve(__dirname, './view/index.html'));
});

//404 page
app.all('*', (req,res)=>{
	res.status(404).send('404 Not Found');
});

app.listen(port, function(){
	console.log('Server started on port :' + port);
});

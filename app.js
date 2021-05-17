const express = require('express');
const path = require('path');

const port = 3000
const app = express();


app.get('/', (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, './public/html/index.html'));
});


// robots.txt
app.get('/robots.txt', (req, res) => {
        res.status(200).sendFile(path.resolve(__dirname, './public/html/robots.txt'));
});



// USERS //
// login
app.get('/login', (req, res) => {
        res.status(200).sendFile(path.resolve(__dirname, './public/html/login/index.html'));
	const username = req.params.username
	console.log(username);
});
// regester
app.get('/register', (req, res) => {
        res.status(200).sendFile(path.resolve(__dirname, './public/html/register/index.html'));
});



// VIEW //
// index
app.get('/view', (req, res) => {
        res.status(200).sendFile(path.resolve(__dirname, './public/html/view/index.html'));
});
// submit
app.get('/view/submit', (req, res) => {
        res.status(200).sendFile(path.resolve(__dirname, './public/html/view/submit/index.html'));
});



// 404 page
app.all('*', (req,res)=>{
	res.status(404)
	res.sendFile(path.resolve(__dirname, './public/html/foo.html'));
});





app.listen(port, function(){
	console.log('Server started on port :' + port);
});

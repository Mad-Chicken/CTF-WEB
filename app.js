const express = require('express');
//const path = require('path');
const bodyParser = require('body-parser');

const port = 3000
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/html/index.html');
});


//////// USERS ////////

// login //
app.get('/login', (req, res) => {
	res.status(200).sendFile(__dirname + '/public/html/login/index.html');
});

// login post //
app.post('/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	console.log(`Username: ${username} Password: ${password}`);
	res.status(200).send(`Username: ${username} Password: ${password}`);
});

// regester //
app.get('/register', (req, res) => {
    res.status(200).sendFile(__dirname + '/public/html/register/index.html');
});

// regester post //
app.post('/register', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	console.log(`Username: ${username} Password: ${password}`);
	res.status(200).send(`Username: ${username} Password: ${password}`);
});


//////// VIEW ////////

// index //
app.get('/view', (req, res) => {
    res.status(200).sendFile(__dirname + '/public/html/view/index.html');
});

// submit //
app.get('/view/submit', (req, res) => {
        res.status(200).sendFile(__dirname, './public/html/view/submit/index.html');
});


//////// robots.txt ////////
app.get('/robots.txt', (req, res) => {
    res.status(200).sendFile(__dirname, '/public/html/robots.txt');
});

//////// 404 ////////
app.all('*', (req,res)=>{
	res.status(404);
	res.sendFile(__dirname + '/public/html/fourOfour.html');
});

//////// Listener ////////
app.listen(port, function(){
	console.log('Server started on port :' + port);
});
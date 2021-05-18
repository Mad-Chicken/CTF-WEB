const express = require('express');
var cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');

const port = 3000
const app = express();
app.use(cookieParser());


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/html/index.html');
});

app.use(express.static('public/css'))

//////// USERS ////////

// login //
app.get('/login', (req, res) => {
	res.status(200).sendFile(__dirname + '/public/html/login/index.html');
	res.cookie('key', 'value')
});

// login post //
app.post('/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	console.log(`Username: ${username} Password: ${password}`);
	res.status(200).send(`Username: ${username} Password: ${password}`);
});


//////// VIEW ////////

// index //
app.get('/view', (req, res) => {
    res.status(200).sendFile(__dirname + '/public/html/view/index.html');
	console.log('Cookies: ', req.cookies);
	res.clearCookie('key');
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

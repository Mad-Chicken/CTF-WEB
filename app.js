const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/html/index.html');
});

app.use(express.static('public/css'))

//////// USERS ////////

// login //
app.get('/login', (req, res) => {
	res.status(200).sendFile(__dirname + '/public/html/login/index.html');
});

// login post //
app.post('/login', (req, res) => {
	fs.readFile(__dirname + 'private/login.cred', 'utf8', function(err, data) {
		if (err) throw err;
		console.log(data);
		console.log(data.foobar);
	  });
	if (req.body.username == "foobar" && req.body.password == "password") {
		res.cookie('SID', 'loginComplete')
		res.status(200).redirect('/view');
	} else {
		res.status(403).sendFile(__dirname + '/public/html/login/index.html');
	}
});


//////// VIEW ////////

// index //
app.get('/view', (req, res) => {
	if (req.cookies.SID == "loginComplete") {
		res.status(200).sendFile(__dirname + '/public/html/view/index.html');
	} else {
		res.status(404).sendFile(__dirname + '/public/html/fourOfour.html');
	}
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
	res.status(404).sendFile(__dirname + '/public/html/fourOfour.html');
});

//////// Listener ////////
app.listen(port, function(){
	console.log('Server started on port :' + port);
});

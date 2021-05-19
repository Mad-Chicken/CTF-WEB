const express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret: "secret_key",
	cookie: { maxAge: 30000 },
	resave: false,
	saveUninitialized: false
}))

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
	var userData = JSON.parse(fs.readFileSync(__dirname + '/private/login.cred','utf8'));
	if (req.body.username && req.body.password) {
		console.log(req.session);
		if (req.session.authenticated) {
			res.status(200).redirect('/view');
		} else {
			if (req.body.username in userData && req.body.password == userData[req.body.username]) {
				if (req.body.username === "admin" && req.body.password == userData[req.body.username]) {
					req.session.authenticatedAdmin = true;
				}
				req.session.authenticated = true;
				res.status(200).redirect('/');
			} else {
				res.status(403).sendFile(__dirname + '/public/html/login/index.html');
			}
		}
	} else {
		res.status(403).sendFile(__dirname + '/public/html/login/index.html');
	}
});


//////// VIEW ////////

// index //
app.get('/view', (req, res) => {
	if (req.session.authenticated) {
		if (req.session.authenticatedAdmin) {
			res.status(200).sendFile(__dirname + '/public/html/view/submit/index.html');
		} else {
			res.status(200).sendFile(__dirname + '/public/html/view/index.html');
		}
	} else {
		res.status(401).sendFile(__dirname + '/public/html/fourOfour.html');
	}
});

// submit //
app.get('/submit', (req, res) => {
    res.status(200).sendFile(__dirname, '/public/html/view/submit/index.html');
});


//////// robots.txt ////////
app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
	res.status(200)
    res.send(`#        _
#       [ ]
#      (   )
#       |>|
#    __/===\\__
#   //| o=o |\\\\
# <]  | o=o |  [>
#     \\=====/
#    / / | \\ \\
#   <_________>

User-agent: *
Disallow: /
Disallow: /admin/page.html`);
});

//////// 404 ////////
app.all('*', (req,res)=>{
	res.status(404).sendFile(__dirname + '/public/html/fourOfour.html');
});

//////// Listener ////////
app.listen(port, function(){
	console.log('Server started on port :' + port);
});

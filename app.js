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
	cookie: { maxAge: 10*60*1000 },
	resave: false,
	saveUninitialized: false
}))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/html/index.html');
});

// public css //
app.use(express.static('public/css'));
app.use(express.static('public/images'))

//////// USERS ////////

// login //
app.get('/login', (req, res) => {
	res.clearCookie('FID');
	if (req.session.authenticated) {
		res.status(200).redirect('/view');
	} else {
		res.status(200).sendFile(__dirname + '/public/html/login/index.html');
	}
});

// login post //
app.post('/login', (req, res) => {
	var userData = JSON.parse(fs.readFileSync(__dirname + '/private/login.cred','utf8'));
	if (req.session.authenticated) {
		res.status(200).redirect('/view');
	} else {
		if (req.body.username in userData && req.body.password == userData[req.body.username]) {
			if (req.body.username === "agent" && req.body.password == userData[req.body.username]) {
				res.status(200)
				req.session.authenticatedAgent = true;
				req.session.authenticated = true;
				res.redirect('/private');
			} else if (req.body.username === "rick") {
				res.status(418)
				res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ?autoplay=1');
			} else {
				res.status(200)
				req.session.authenticated = true;
				res.redirect('/');
			}
		} else {
			res.status(403).sendFile(__dirname + '/public/html/login/index.html');
		}
	}
});

// Password Reset //
app.post('/resetpassword', (req, res) => {
	res.cookie('FID', 'flag(c0ok!e_m0nSter_eAt_c0ok!e)', {maxAge: 12000});
	res.status(200)
	res.redirect('/');
});

// Logout //
app.get('/logout', (req, res) => {
	res.status(200)
	req.session.authenticatedAgent = false;
	req.session.authenticated = false;
	res.redirect('/');
});


//////// VIEW ////////

// index //
app.get('/view', (req, res) => {
	if (req.session.authenticated) {
		if (req.session.authenticatedAgent) {
			res.status(200).sendFile(__dirname + '/private/index.html');
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


//////// PRIVATE ////////
// index //
app.get('/private/', (req, res) => {
	if (req.session.authenticated) {
		if (req.session.authenticatedAgent) {
			res.status(200).sendFile(__dirname + '/private/html/index.html');
		} else {
			res.status(403).sendFile(__dirname + '/public/html/fourOfour.html');
		}
	} else {
		res.status(401).sendFile(__dirname + '/public/html/fourOfour.html');
	}
});

// css //
app.get('/private/index.css', (req, res) => {
	if (req.session.authenticatedAgent) {
		res.sendFile(__dirname + '/private/css/index.css');
	} else if (req.session.authenticated) {
		res.status(403)
	} else {
		res.status(401)
	}
});

//////// MISSIONS ////////
// index //
app.get('/missions', (req, res) => {
	if (req.session.authenticated) {
		if (req.session.authenticatedAgent) {
			res.status(200).sendFile(__dirname + '/private/html/missions/index.html');
		} else {
			res.status(403).sendFile(__dirname + '/public/html/fourOfour.html');
		}
	} else {
		res.status(401).sendFile(__dirname + '/public/html/fourOfour.html');
	}
});

// css //
app.get('/private/missions.css', (req, res) => {
	if (req.session.authenticatedAgent) {
		res.sendFile(__dirname + '/private/css/missions.css');
	} else if (req.session.authenticated) {
		res.status(403)
	} else {
		res.status(401)
	}
});


//////// MESSAGES ////////
// index //
app.get('/messages', (req, res) => {
	if (req.session.authenticated) {
		if (req.session.authenticatedAgent) {
			res.status(200).sendFile(__dirname + '/private/html/messages/index.html');
		} else {
			res.status(403).sendFile(__dirname + '/public/html/fourOfour.html');
		}
	} else {
		res.status(401).sendFile(__dirname + '/public/html/fourOfour.html');
	}
});

// css //
app.get('/private/messages.css', (req, res) => {
	if (req.session.authenticatedAgent) {
		res.sendFile(__dirname + '/private/css/messages.css');
	} else if (req.session.authenticated) {
		res.status(403)
	} else {
		res.status(401)
	}
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

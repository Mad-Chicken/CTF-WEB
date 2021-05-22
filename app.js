const express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const e = require('express');

const port = 3000
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(session({
	secret: "secret_key",
	cookie: { maxAge: 10*60*1000 },
	resave: false,
	saveUninitialized: false
}))

app.get('/', (req, res) => {
	var Name, URL
	if (req.session.authenticated) {
		Name = "Logout"
		URL = "/logout"
	} else {
		Name = "Login"
		URL = "/login"
	}
	res.render(__dirname + '/public/html/index.ejs', {
		loginName: Name,
		loginURL: URL
	});
});

// public css //
app.use(express.static('public/css'));
app.use(express.static('public/images'))

//////// USERS ////////

// login //
app.get('/login', (req, res) => {
	res.clearCookie('FID');
	if (req.session.authenticated) {
		res.status(200).redirect('/admin');
	} else {
		res.status(200).sendFile(__dirname + '/public/html/login/index.html');
	}
});

// login post //
app.post('/login', (req, res) => {
	var userData = JSON.parse(fs.readFileSync(__dirname + '/private/login.cred','utf8'));
	if (req.session.authenticated) {
		res.status(200).redirect('/admin');
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


//////// Admin ////////

// index //
app.get('/admin', (req, res) => {
	if (req.session.authenticated) {
		if (req.session.authenticatedAgent) {
			res.status(200).sendFile(__dirname + '/private/html/index.html');
		} else {
			res.status(200).sendFile(__dirname + '/public/html/admin/index.html');
		}
	} else {
		res.status(401).sendFile(__dirname + '/public/html/fourOfour.html');
	}
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
		res.status(403);
	} else {
		res.status(401);
	}
});

// exif #1 //
app.get('/missions/mission_photo.jpg', (req, res) => {
	if (req.session.authenticated) {
		if (req.session.authenticatedAgent) {
			res.status(200).download(__dirname + '/private/images/mission_photo.jpg');
		} else {
			res.status(403);
		}
	} else {
		res.status(401);
	}
});

// exif location #2 //
app.get('/missions/mission_location_photo.png', (req, res) => {
	if (req.session.authenticated) {
		if (req.session.authenticatedAgent) {
			res.status(200).download(__dirname + '/private/images/mission_location_photo.png');
		} else {
			res.status(403);
		}
	} else {
		res.status(401);
	}
});

// browser //
app.get('/missions/browser/', (req, res) => {
	if (req.session.authenticatedAgent) {
		if (req.headers['user-agent'] == "AgencySecureBrowser") {
			res.status(200);
			res.render(__dirname + '/private/html/missions/browser/index.ejs', {
				data: "Latest version of AgencySecureBrowser required (4.2.0)"
			});
		} else if (req.headers['user-agent'] == "AgencySecureBrowser/4.2.0") {
			res.status(200);
			res.render(__dirname + '/private/html/missions/browser/index.ejs', {
				data: "flag(bR0w$er_bR0w$_bR0w$er)"
			});
		} else {
			res.status(200);
			res.render(__dirname + '/private/html/missions/browser/index.ejs', {
				data: "Use of 'AgencySecureBrowser' browser required"
			});
		}
	} else if (req.session.authenticated) {
		res.status(403);
	} else {
		res.status(401);
	}
});

// Captured website //
app.get('/missions/capturedWebsite/', (req, res) => {
	if (req.session.authenticatedAgent) {
		res.cookie('admin', 'false', {maxAge: 60000});
		//res.sendFile(__dirname + '/private/html/missions/capturedWebsite/index.html');
		res.render(__dirname + '/private/html/missions/capturedWebsite/index.ejs', {
			data: ""
		});
	} else if (req.session.authenticated) {
		res.status(403);
	} else {
		res.status(401);
	}
});

app.post('/missions/capturedWebsite/', (req, res) => {
	res.status(200)
	if (req.cookies['admin'] == "true") {
		res.render(__dirname + '/private/html/missions/capturedWebsite/index.ejs', {
			data: "flag(cH@nge_c00k!e_2_e@t_?)"
		});
	} else {
		res.redirect("/missions/capturedWebsite/");
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


// hidden flag //
app.get('/admin/flag.html', (req, res) => {
	res.status(200)
	res.sendFile(__dirname + '/public/html/admin/flag.html');
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
Disallow: /admin/flag.html`);
});

//////// 404 ////////
app.all('*', (req,res)=>{
	res.status(404).sendFile(__dirname + '/public/html/fourOfour.html');
});

//////// Listener ////////
app.listen(port, function(){
	console.log('Server started on port :' + port);
});

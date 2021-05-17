const express = require('express');
//const path = require('path');
const bodyParser = require('body-parser');

const port = 3000
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/login', (req, res) => {
	res.sendFile(__dirname + '/public/html/login/index.html');
});

app.post('/login', (req, res) => {
	// Insert Login Code Here
	let username = req.body.username;
	let password = req.body.password;
	console.log(`Username: ${username} Password: ${password}`);
	res.send(`Username: ${username} Password: ${password}`);
});

app.listen(port, function(){
	console.log('Server started on port :' + port);
});

/*
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
});

app.post('/view', (req, res) => {
	console.log(req)
	res.end()
})

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
	res.status(404).send("<h1>Erro 404</h1>");
	//res.sendFile(path.resolve(__dirname, './public/html/foo.html'));
});
*/

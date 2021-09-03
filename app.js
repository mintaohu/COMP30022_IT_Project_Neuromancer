const express = require('express')
const { Account } = require('./models/account.js')
const { User } = require('./models/user.js')
const app = express()


app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))	// define where static assets live



// connect to database
require('./models/db.js') 

// connect to router
const userRouter = require('./routes/userRouter.js')


// send HTTP requests to router
app.use('/', userRouter);

app.get('/login', (req, res) => {
	res.sendFile('./views/login.html', {root:__dirname})
})

app.get('/register', (req, res) => {
	res.sendFile('./views/register.html', {root:__dirname})
})

app.post('/login', (req, res) => {
	var account = new Account({
		username:req.body.username,
		password:req.body.password
	})


})

app.post('/register', (req, res) => {
	var account = new Account({
		username:req.body.username,
		password:req.body.password
	})

	var user = new User({
		name: req.body.name,
		email: req.body.email,
		tel: req.body.tel
	})
	
})


app.all('*', (req, res) => {  // 'default' route to catch user errors
	//res.status(404).render('error', {errorCode: '404', message: 'That route is invalid.'})
	res.send('error')
})


// start server and listen for HTTP requests
app.listen(process.env.PORT || 5000, () => {
  console.log("SeeYa app is listening ...")
})

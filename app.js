const express = require('express')

//const { Account } = require('./models/account.js')
const { User } = require('./models/user.js')
const app = express()
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))	// define where static assets live

app.use(express.json());
app.use(methodOverride('_method'));

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

app.get('/resetPassword', (req, res) => {
	res.sendFile('./views/resetPassword.html', {root:__dirname})
})

app.get('/editProfile', (req, res) => {
	res.sendFile('./views/editProfile.html', {root:__dirname})
})




app.all('*', (req, res) => {  // 'default' route to catch user errors
	//res.status(404).render('error', {errorCode: '404', message: 'That route is invalid.'})
	res.status(404)
	res.send('error')
})


// start server and listen for HTTP requests
app.listen(process.env.PORT || 5000, () => {
  console.log("SeeYa app is listening ...")

})

module.exports = app;


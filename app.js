const express = require('express')

//const { Account } = require('./models/account.js')
const { User } = require('./models/user.js')
const app = express()
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require("connect-flash")
const passport = require('passport')
app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))	// define where static assets live

app.use(express.json());
app.use(methodOverride('_method'));

const cors = require('cors');
app.use(
	cors({
		origin: "*",
	})
)

app.use(express.static(__dirname + '/public'))

// passport configuration
app.use(session({ secret: "mysecret" }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// connect to database
require('./models/db.js') 

// connect to router
const userRouter = require('./routes/userRouter.js')


// send HTTP requests to router
app.use('/', userRouter);

app.get('/login', (req, res) => {
	res.sendFile('./views/login.html', {root:__dirname});
})

app.get('/logout', (req, res) => {
	res.send("succeed logout");
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

app.get('/createEvent', (req, res) => {
	res.send("Event created");
})

app.get('/editEvent', (req, res) => {
	res.sendFile('./views/editEvent.html', {root:__dirname})
})

app.get('/createFriendRequest', (req, res) => {
	res.sendFile('./views/createFriendRequest.html', {root:__dirname})
})

app.get('/renameFriend', (req, res) => {
	res.sendFile('./views/renameFriend.html', {root:__dirname})
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


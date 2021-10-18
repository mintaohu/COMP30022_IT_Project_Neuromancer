// add our router
const express = require('express')
const userRouter = express.Router()
const bodyParser = require('body-parser');

var path = require('path');
const session = require('express-session');

// Set passport js
/*var Passport = require('passport').Passport
const passport = new Passport()*/
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');



userRouter.use(bodyParser.urlencoded({extended:true}))

/*userRouter.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}))*/



// connect to controller
const userController = require('../controllers/userController.js')
const agendaController = require('../controllers/agendaController.js')

const {User} = require('../models/user.js');
const { Console } = require('console');
//userRouter.use(passport.initialize());
//userRouter.use(passport.session());

passport.serializeUser(function (user, done){
	done(null, user._id)
})

passport.deserializeUser(function (id, done){
	User.findById(id, function (err, user) {
		done(err, user);
	})
})

passport.use(new localStrategy({
		usernameField: 'email'
	},
	function (email, password, done) {
		User.findOne({ email: email}, function (err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false, {message: "No user registered with that email"});
			}
			bcrypt.compare(password, user.password, function (err, res) {
				if (err) return done(err);
				if (res === false) return done(null, false, {message: "Incorrect password"});

				
				return done(null, user);
			})
		})
}))

// Checking for user authentication for other paths
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){

		return next();
		}
	req.session.returnTo = req.originalUrl;
	res.redirect('/login?needLogin=true');
}

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}


userRouter.post('/login', function(req, res, next) {
	try {
		let emailCheck = req.user.email;
		res.status(300);
		return res.send("User already loged in");
	}catch(e) {
		passport.authenticate('local', function(err, user, info) {
			if (err) { res.status(400); return next(err); }
			if (!user) { res.status(400); return  next(err); }
			req.logIn(user, async function(err) {
				 if (err) { return next(err); }
				delete req.session.returnTo;
	
				let currentUser = await User.findOne({email: req.user.email}).lean();
				if (!currentUser.status.localeCompare("Online")) {
					res.status(300);
					return res.send("User already loged in");
				}
				
				
				await User.updateOne(
					{
						email: req.user.email
					},
					{$set: {
						status: "Online"}
					}
				);
				res.status(200);
				//console.log(req.user);
				//console.log("123");
				console.log("Succeed to login");
				return res.send("Succeed to login")
			});
	  })(req, res, next);
	}


	
})


userRouter.get('/logout', async function (req, res) {
	await User.updateOne(
		{
			email: req.user.email
		},
		{$set: {
			status: "Offline"}
		}
	);

	req.logout();
	res.status(200);
	console.log("successfully logout");
    return res.send("successfully logout")
})



userRouter.post('/register', userController.register)

userRouter.post('/getAgenda', agendaController.getAgenda)

userRouter.post('/getContacts', userController.getContacts)

userRouter.post('/resetPassword', userController.resetPassword)

userRouter.get('/getProfile', userController.getProfile)

userRouter.post('/editProfile', userController.editProfile)

userRouter.post('/createEvent', agendaController.createEvent)

userRouter.get('/getEvent/:eventId', agendaController.getEvent)

userRouter.post('/editEvent/:eventId', agendaController.editEvent)

userRouter.post('/createFriendRequest', userController.createFriendRequest)

userRouter.post('/getFriendRequest', userController.getFriendRequest)

userRouter.get('/acceptFriendRequest/:friendRequestId', userController.acceptFriendRequest)

userRouter.get('/declineFriendRequest/:friendRequestId', userController.declineFriendRequest)

userRouter.post('/deleteFriend/:email', userController.deleteFriend)

userRouter.get('/viewAgenda/:email', agendaController.viewAgenda)

userRouter.post('/joinEvent/:eventId', agendaController.joinEvent)

userRouter.get('/quitEvent/:eventId', agendaController.quitEvent)

userRouter.post('/deleteEvent/:eventId', agendaController.deleteEvent)

// export the router
module.exports = userRouter
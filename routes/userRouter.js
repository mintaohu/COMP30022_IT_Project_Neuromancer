// add our router
const express = require('express')
const userRouter = express.Router()
const bodyParser = require('body-parser');

var path = require('path');
const session = require('express-session');

// Set passport js
var Passport = require('passport').Passport
const passport = new Passport()
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');



userRouter.use(bodyParser.urlencoded({extended:true}))

userRouter.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}))



// connect to controller
const userController = require('../controllers/userController.js')

const {User} = require('../models/user.js')
userRouter.use(passport.initialize());
userRouter.use(passport.session());

passport.serializeUser(function (user, done){
	done(null, user.id)
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
	passport.authenticate('local', function(err, user, info) {
		if (err) { res.status(400); return next(err); }
    	if (!user) { res.status(400); return  next(err); }
    	req.logIn(user, function(err) {
     		if (err) { return next(err); }
    		delete req.session.returnTo;
			res.status(200);
            return res.send("Succeed to login")
    	});
  })(req, res, next);
})


userRouter.get('/logout', function (req, res) {
	req.logout();
	res.status(200)
    return res.send("successfully logout")
})


// process routes by calling controller functions
userRouter.get('/test', (req, res) => userController.getAllUsers(req, res))

// userRouter.get('register', (req, res) => {
// 	res.render('register')
// })

// userRouter.get('login', (req, res) => {
// 	res.render('login')
// })

userRouter.post('/register', userController.register)

userRouter.get('/getEvents', userController.getEvents)



// export the router
module.exports = userRouter
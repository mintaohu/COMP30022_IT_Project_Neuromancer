// connect to Mongoose model
const mongoose = require('mongoose')

const {User, UserSchema} = require('../models/user.js')
const bcrypt = require('bcrypt')


// registering a new user
const register = async (req, res, next) => {

	try {
		const user = await User.findOne( {email: req.body.email})
		if (user) {
			res.status(400)
			return res.send("User already exists")
		}

		bcrypt.genSalt(10, async function (err, salt) {
			if (err) return next(err);
	  		bcrypt.hash(req.body.password, salt, async function (err, hash) {
				if (err) return next(err);
				// new user collection
				const newUser = new User({
					email: req.body.email,
					password: hash,
					username: req.body.username,
					age: req.body.age,
					gender: req.body.gender,
					status: "Offline"
				});
  
				await newUser.save()
				res.status(200)
				return res.send("Succeed to register")
  
	  		});
		});
	} catch (err) {
		console.log(err)
	}
	
}

const getEvents =  async (req, res) => {

    let thisUser = await User.findOne( {email: req.user.email}).lean()
    let userEvents = thisUser.events
    try {
        if (userEvents.length > 0){
			res.status(200)
        	return res.json(userEvents)
        }

		
		res.status(300)
        return res.send("User's agenda is currently empty")
        

    } catch (err) {
        res.status(400)
        return res.send(err.msg)
    }
}

const getContacts =  async (req, res) => {

    let thisUser = await User.findOne( {email: req.user.email}).lean()
    let userContacts = thisUser.contact

    try {
        if (userContacts.length > 0){
			res.status(200)
        	return res.json(userContacts)
        }
		res.status(300)
        return res.send("No contact is found")
        

    } catch (err) {
        res.status(400)
        return res.send(err.msg)
    }
}


// export the functions
module.exports = {
	register,
	getEvents,
	getContacts
}
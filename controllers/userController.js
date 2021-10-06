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
			if (err) {res.status(400); return next(err);}
	  		bcrypt.hash(req.body.password, salt, async function (err, hash) {
				if (err) {res.status(400); return next(err);}
				// new user collection
				const newUser = new User({
					email: req.body.email,
					password: hash,
					username: req.body.username,
					age: req.body.age,
					gender: req.body.gender,
					status: "Offline",
					bio: "",
					education: "",
					work: "",
					currentCity: ""
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
	let sortedContacts = new Array()

	for (let friendId of userContacts) {
		let friend = await User.findOne({_id: friendId}).lean()
		if (!friend.status.localeCompare("Online")) {
			let index = userContacts.indexOf(friendId)
			userContacts.splice(index, 1)
			sortedContacts.push(friendId)

		}
	}
	
	for (let friendId of userContacts) {
		sortedContacts.push(friendId)
	}

    try {
        if (sortedContacts.length > 0){
			res.status(200)
        	return res.json(sortedContacts)
        }
		res.status(300)
        return res.send("No contact is found")
        

    } catch (err) {
        res.status(400)
        return res.send(err.msg)
    }
}

const resetPassword =  async (req, res) => {
	try {
		bcrypt.genSalt(10, async function (err, salt) {
			if (err) {res.status(400); return next(err);}
	  		bcrypt.hash(req.body.password, salt, async function (err, hash) {
				if (err) {res.status(400); return next(err);}
				await User.updateOne( {email: req.user.email},{$set: {password: hash}})
				res.status(200)
				return res.send("Succeed to reset password")
	  		});
		});
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}

const getProfile = async (req, res) => {
	try {
		let user = await User.findOne({email: req.user.email}).lean()
		res.status(200)
		return res.json(user)
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}

const editProfile = async (req, res) => {
	try {
		await User.updateOne( {email: req.user.email},{$set: {age: req.body.age, bio: req.body.bio, education: req.body.education, work: req.body.work, currentCity: req.body.currentCity}})
		res.status(200)
		let user = await User.findOne({email: req.user.email}).lean()
		return res.json(user)
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}



// export the functions
module.exports = {
	register,
	getEvents,
	getContacts,
	resetPassword,
	getProfile,
	editProfile,
}
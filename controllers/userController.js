// connect to Mongoose model
const mongoose = require('mongoose')

const {User, UserSchema} = require('../models/user.js')
const {FriendRequest} = require('../models/FriendRequest.js')
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
	try { 
		await User.findOne( {email: req.user.email}).lean()
    } catch (err) {
        res.status(400)
        return res.send("Log in to view contacts")
    }

    let thisUser = await User.findOne( {email: req.user.email}).lean()
    let userContacts = thisUser.contact
	let sortedContacts = new Array()

	for (let friendEmail of userContacts) {
		let friend = await User.findOne({email: friendEmail}).lean()
		if (!friend.status.localeCompare("Online")) {
			let index = userContacts.indexOf(friendEmail)
			userContacts.splice(index, 1)
			sortedContacts.push(friendEmail)

		}
	}
	
	for (let friendEmail of userContacts) {
		sortedContacts.push(friendEmail)
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
		return res.send("Succeed to edit profile")
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}

const createFriendRequest = async (req, res) => {
	try {
		let otherUser = await User.findOne({email: req.body.email}).lean()
		if(otherUser == null) {
			res.status(400)
			return res.send("User does not exist")
		}

		let thisUser = await User.findOne({email: req.user.email}).lean()

		for (friend of thisUser.contact) {
			if (!friend.localeCompare(req.body.email)) {
				res.status(400)
				return res.send("User is already your friend")
			}

		}

		const newFriendRequest = new FriendRequest({
			from: req.user.email,
			to: req.body.email
		});

		await newFriendRequest.save()

		res.status(200)
		return res.send("Succeed to send friend request")
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}

const getFriendRequest = async (req, res) => {
	try {
		let friendRequestArray = await FriendRequest.find({from: req.user.email}).lean()
		res.status(200)
		return res.json(friendRequestArray)
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
	createFriendRequest,
	getFriendRequest
}
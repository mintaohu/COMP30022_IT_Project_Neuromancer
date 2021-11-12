// connect to Mongoose model
const mongoose = require('mongoose')

const {User, UserSchema} = require('../models/user.js')
const {Alias, AliasSchema} =  require('../models/alias.js')
const {FriendRequest} = require('../models/friendRequest.js')
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


const getContacts =  async (req, res) => {
	try { 
		await User.findOne( {email: req.body.email}).lean()
    } catch (err) {
        res.status(400)
        return res.send("Log in to view contacts")
    }

    let thisUser = await User.findOne( {email: req.body.email}).lean()
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
		let user = await User.findOne({email: req.body.email}).lean()
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
		let otherUser = await User.findOne({email: req.body.friendEmail}).lean()
		if(otherUser == null) {
			res.status(400)
			return res.send("User does not exist")
		}

		let thisUser = await User.findOne({email: req.body.email}).lean()

		for (friend of thisUser.contact) {
			if (!friend.localeCompare(req.body.friendEmail)) {
				res.status(400)
				return res.send("User is already your friend")
			}

		}

		const newFriendRequest = new FriendRequest({
			from: req.body.email,
			to: req.body.friendEmail,
			type: "Friend"
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
		let friendRequestArray = await FriendRequest.find({to: req.body.email}).lean()
		res.status(200)
		return res.json(friendRequestArray)
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}

const acceptFriendRequest = async (req, res) => {
	try {
		let friendRequest = await FriendRequest.findOne({_id: req.params.friendRequestId}).lean()
		let sender = await User.findOne({email: friendRequest.from})
		let recipient = await User.findOne({email: friendRequest.to})

		for (friend of sender.contact) {
			if (!friend.localeCompare(recipient.email)) {
				res.status(400)
				return res.send("You are already friends")
			}
		}

		for (friend of recipient.contact) {
			if (!friend.localeCompare(sender.email)) {
				res.status(400)
				return res.send("You are already friends")
			}

		}

		sender.contact.push(recipient.email)
		recipient.contact.push(sender.email)
		await User.updateOne({email: sender.email},{$set: {contact: sender.contact}})
		await User.updateOne({email: recipient.email},{$set: {contact: recipient.contact}})
		const oneAlias = new Alias({
			user: sender.email,
			friend: recipient.email,
			name: recipient.username
		});

		await oneAlias.save()

		const anotherAlias = new Alias({
			user: recipient.email,
			friend: sender.email,
			name: sender.username
		});

		await anotherAlias.save()

		await FriendRequest.deleteOne({_id: req.params.friendRequestId})

		res.status(200)
		return res.send("succeed to accept friend request")
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}

const declineFriendRequest = async (req, res) => {
	try {
		await FriendRequest.deleteOne({_id: req.params.friendRequestId})
		res.status(200)
		return res.send("succeed to decline friend request")
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}

const deleteFriend = async (req, res) => {
	try {
		let user = await User.findOne({email: req.body.email})
		let updatedContact = user.contact
		let index = updatedContact.indexOf(req.params.email)
		updatedContact.splice(index, 1)
		
		
		await User.updateOne({email: req.body.email}, {$set: {contact: updatedContact}})

		let otherUser = await User.findOne({email: req.params.email})
		let otherUpdatedContact = otherUser.contact
		let otherIndex = otherUpdatedContact.indexOf(req.body.email)
		otherUpdatedContact.splice(otherIndex, 1)

		await User.updateOne({email: req.params.email}, {$set: {contact: otherUpdatedContact}})

		await Alias.deleteOne({email: user.email, friend: otherUser.email})
		await Alias.deleteOne({email: otherUser.email, friend: user.email})

		res.status(200)
		return res.send("succeed to delete friend")
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}

const renameFriend = async (req, res) => {
	try {
		await Alias.updateOne({user: req.body.user, friend: req.body.friend},{$set: {name: req.body.name}})
		res.status(200)
		return res.send("succeed to rename friend")
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}

const getAlias =  async (req, res) => {
	try {
		let thisAlias = await Alias.findOne({user: req.body.user, friend: req.body.friend})
		return res.json(thisAlias)
	} catch (err) {
		res.status(400)
		console.log(err)
	}
}

// export the functions
module.exports = {
	register,
	getContacts,
	resetPassword,
	getProfile,
	editProfile,
	createFriendRequest,
	getFriendRequest,
	acceptFriendRequest,
	declineFriendRequest,
	deleteFriend,
	renameFriend,
	getAlias
}
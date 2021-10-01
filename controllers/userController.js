// connect to Mongoose model
const mongoose = require('mongoose')

const {User, UserSchema} = require('../models/user.js')
const bcrypt = require('bcrypt')


const getAllUsers = async (req, res) => { 
	try {
		// we only need names and photos
		const users = await User.find( {}, {name:true, email:true}).lean()
		
		res.json(users)	
	} catch (err) {
		console.log(err)
	}
}

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
					gender: req.body.gender
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

const loginUser = async (req, res) => {
	try {
		const user = await User.findOne( {email: req.body.email})
		if (user) {
			Password = req.body.password
			storedPassword = user.password

			const passwordMatch = await bcrypt.compare(Password, storedPassword)

			if (passwordMatch) {
				res.status(200)
				return res.send("Succeed to login")
			} else {
				res.status(400)
				return res.send("Wrong password")
			}


		} else {
			res.status(400)
			return res.send("User not found")
			
		}
		
	} catch (error) {
		console.log(error)
	}
}

const getEvents =  async (req, res) => {

    let thisUser = await User.findOne( {email: req.user.email}).lean()
    let userEvents = thisUser.events
	console.log( req.user.email);
    try {
        if (userEvents.length > 0){
			res.status(200)
        	return res.json(userEvents)
        }
		
		res.status(204)
        return res.send("User's agenda is currently empty")
        

    } catch (err) {
        res.status(400)
        return res.send(err.msg)
    }
}


// export the functions
module.exports = {
	getAllUsers,
	register,
	loginUser,
	getEvents
}
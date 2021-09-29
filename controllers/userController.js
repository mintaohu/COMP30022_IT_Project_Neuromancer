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

const register = async (req, res) =>{
	try {
		const user = await User.findOne( {email: req.body.email})
		if (!user) {
			hashPassword = await bcrypt.hash(req.body.password, 10)
			newUser = new User({
				email: req.body.email,
				password: hashPassword,
				name: req.body.username,
				age: req.body.age,
				gender: req.body.gender
			})

			try {
				await newUser.save()
			} catch (error) {
				res.status(409).json({ message: error.message });
			}

			res.status(200)
			return res.send("Succeed to register")
			
		} else {
			res.status(400)
			return res.send("User already exists")
		}
	} catch (error) {
		console.log(error)
	}
}

// registering a new user
const register = async (req, res) => {
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
			password: hashPassword,
			name: req.body.username,
			age: req.body.age,
			gender: req.body.gender
		});
  
		await newUser.save()
		res.status(200)
		return res.send("Succeed to register")
  
	  });
	});
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


// export the functions
module.exports = {
	getAllUsers,
	register,
	loginUser
}
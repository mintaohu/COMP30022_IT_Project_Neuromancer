// connect to Mongoose model
const mongoose = require('mongoose')

const encryption = require('../utils/encryption')
const {User, UserSchema} = require('../models/user.js')


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
		} else {
			res.status(400)
		}
	} catch (error) {
		console.log(err)
	}
}

const loginUser = async (req, res) => {
	try {
		foundUser = User.find((data) => req.params.Email === data.email)
		if (foundUser) {
			Password = req.body.password
			storedPassword = foundUser.password

			const passwordMatch = await bcrypt.compare(Password, storedPassword)

			if (passwordMatch) {
				res.status(200)
			} else {
				res.status(400)
			}


		} else {
			res.status(400)
		}
		
	} catch (error) {
		console.log(err)
	}
}


// export the functions
module.exports = {
	getAllUsers,
	register,
	loginUser
}
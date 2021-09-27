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
		foundUser = User.find((data) => req.body.email === data.email)
		if (!foundUser) {
			
			hashPassword = await bcrypt.hash(req.body.password, 10)

			newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: hashPassword,
				tel: req.body.tel
			})

			try {
				await newUser.save()
			} catch (error) {
				res.status(409).json({ message: error.message });
			}

			res.send("Account registration is successful")
		} else {
			res.send("Failed: Email has already been used")
		}
	} catch (error) {
		
	}
}



const loginUser = async (req, res) => {
	try {
		foundUser = User.find((data) => req.body.email === data.email)
		if (foundUser) {
			Password = req.body.password
			storedPassword = foundUser.password

			const passwordMatch = await bcrypt.compare(Password, storedPassword)

			if (passwordMatch) {
				res.send("Login Success: Welcome")
			} else {
				res.send("wrong password")
			}


		} else {
			res.send("User Not Found")
		}
		
	} catch (error) {
		
	}
}


// export the functions
module.exports = {
	getAllUsers,
}
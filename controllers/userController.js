const bcrypt = require("bcrypt")
const { User } = require('../models/user.js')


const getAllUsers = async (req, res) => { 
	try {
		// we only need names and photos
		const users = await User.find( {}, {name:true, email:true}).lean()
		
		res.json(users)	
	} catch (err) {
		console.log(err)
	}
}



const userRegister = async (req, res) =>{
	
	try {

		// check if the mail has been used
		const existUser = await User.findOne({ username: req.body.email})

		if (!existUser) {
			
			// check if confirmed password match the password
			if (req.body.confirmed == req.body.password){
				// encrypt password
				hashPassword = await bcrypt.hash(req.body.password, 10)

				newUser = new User({
					email: req.body.email,
					password: hashPassword,
					name: req.body.name,
					age: req.body.age,
					gender: req.body.gender
				})
				
				// save to db
				try {
					await newUser.save()
				} catch (error) {
					console.log(error)
				}
	
				res.send("Account registration is successful")
				console.log("Account registration is successful")

			} else {
				res.send("confirmed password doesn't match the password")
				console.log("confirmed password doesn't match the password")
			}


			
		} else {
			res.send("Failed: Email has already been used")
			console.log("Failed: Email has already been used")
		}
	} catch (error) {
		console.log(error)
	}
}



const userLogin = async (req, res) => {
	try {
		
		const existUser = await User.findOne({ username: req.body.email})

		if (existUser) {
			Password = req.body.password
			storedPassword = existUser.password

			const passwordMatch = await bcrypt.compare(Password, storedPassword)

			if (passwordMatch) {
				res.send("Login Success: Welcome")
				console.log("Login Success: Welcome")
			} else {
				res.send("wrong password")
				console.log("wrong password")
			}


		} else {
			res.send("User Not Found")
			console.log("User Not Found")
		}
		
	} catch (error) {
		res.send("User Not Found")
		console.log(error)
	}
}

// export the functions
module.exports = {
	getAllUsers,
	userRegister,
	userLogin,
}
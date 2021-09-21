// connect to Mongoose model
const mongoose = require('mongoose')
const {User} = require('../models/user.js')


const getAllUsers = async (req, res) => { 
	try {
		// we only need names and photos
		const users = await User.find( {}, {name:true, email:true}).lean()
		
		res.json(users)	
	} catch (err) {
		console.log(err)
	}
}

// export the functions
module.exports = {
	getAllUsers,
}
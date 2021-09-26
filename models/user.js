const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({

	// registration information
	email: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	age: { type: Number,  required: true },
	gender: { type: String, enum: ["Male", "Female"], required: true },

	// user's schedule information and friends
	contact: {type: [], required: false},
	events: {type: [], required: false},

})

const User = mongoose.model("User", UserSchema)
module.exports = {User, UserSchema}
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

	// registration information
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	age: { type: Number,  required: true },
	gender: { type: String, enum: ["Male", "Female"], required: true },


	// user's profile information
	avatar: { data: Buffer, contentType: String, required: false},
	introduction: {type: String, required: false},
	phone: {type: String, required: false, unique: true},
	address: {type: String, required: false},


	// user's schedule information and friends
	contact: {type: [], required: false},
	events: {type: [], required: false},

},
{ timestamps: true }
)


const User = mongoose.model("User", userSchema)
module.exports = { User }
const mongoose = require("mongoose")
const {EventSchema} = require("./event.js")

const UserSchema = new mongoose.Schema({

	// registration information
	email: { type: String, required: true },
	password: { type: String, required: true },
	username: { type: String, required: true },
	age: { type: Number,  required: true },
	gender: { type: String, enum: ["Male", "Female"], required: true },

	// user's schedule information and friends
	contact: [{type:String}],
	events: [EventSchema]


})

const User = mongoose.model("User", UserSchema)
module.exports = {User, UserSchema}
const mongoose = require("mongoose")
const {EventSchema} = require("./event.js")

const UserSchema = new mongoose.Schema({

	// registration information
	email: { type: String, required: true },
	password: { type: String, required: true },
	username: { type: String, required: true },
	age: { type: Number,  required: true },
	gender: { type: String, required: true },

	// user's schedule information and friends
	contact: [{type:String}],
	agenda: [{type:EventSchema}],
	status: { type: String, enum: ["Online", "Offline"], required: true},
	bio: {type: String},
	education: {type: String},
	work: {type: String},
	currentCity: {type: String}
})

const User = mongoose.model("User", UserSchema)
module.exports = {User, UserSchema}
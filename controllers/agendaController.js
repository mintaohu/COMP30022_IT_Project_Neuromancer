// connect to Mongoose model
const mongoose = require('mongoose')

const {User, UserSchema} = require('../models/user.js')
const {Event} = require('../models/event.js')

const createEvent = async (req, res) => {
	try {
		const newEvent = new Event({
			sponsor: req.user.email,
			subject: req.body.subject,
			location: req.body.subject,
			date: req.body.date,
			participators: [req.user.email],
			privacy: req.body.privacy,
			details: req.body.details
		});

		await newEvent.save()
		res.status(200)
		return res.send("Succeed to create an event")
	}catch (err) {
		res.status(400)
		console.log(err)
	}
}

const editEvent = async (req, res) => {
	try {
        await Event.updateOne({_id: req.params.eventId},{$set: {
            subject: req.body.subject,
			location: req.body.subject,
			date: req.body.date,
            privacy: req.body.privacy,
			details: req.body.details
        }})
		res.status(200)
		return res.send("Succeed to edit event")
	}catch (err) {
		res.status(400)
		console.log(err)
	}
}

// export the functions
module.exports = {
	createEvent,
    editEvent
}
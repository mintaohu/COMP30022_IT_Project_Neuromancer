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

// const joinEvent= async (req, res) => {
//     try {
        

//         let currentEvent = await Event.findOne({_id: req.params.eventId}).lean()

//         if (req.user.email.localeCompare(currentEvent.sponsor)) {
//             res.status(400)
//             return res.send("Do not have permission to ")
//         }

//         let participators = currentEvent.participators
//         if (participators.indexof(req.params.participatorEmail) != -1) {
//             participators.push(req.params.participatorEmail)
//         }

//         await Event.updateOne({_id: req.params.eventId},{$set: {}})
        
// 		res.status(200)
// 		return res.send("Succeed to edit event")
// 	}catch (err) {
// 		res.status(400)
// 		console.log(err)
// 	}
// }



// export the functions
module.exports = {
	createEvent,
    editEvent
}
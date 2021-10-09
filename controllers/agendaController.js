// connect to Mongoose model
const mongoose = require('mongoose')

const {User, UserSchema} = require('../models/user.js')
const {Event} = require('../models/event.js')

// view own agenda
const getAgenda =  async (req, res) => {
    try {
		let thisUser = await User.findOne( {email: req.user.email}).lean()
		let userAgenda = thisUser.agenda
        if (userAgenda.length > 0){
			res.status(200)
        	return res.json(userAgenda)
        }

		
		res.status(300)
        return res.send("User's agenda is currently empty")
        

    } catch (err) {
        res.status(400)
        return res.send("Log in to view your agenda")
    }
}

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
		let event = await Event.findOne({sponsor: newEvent.sponsor, subject: newEvent.subject, location: newEvent.location, date: newEvent.date, participators: newEvent.participators, privacy: newEvent.privacy, details: newEvent.details})

		let user = await User.findOne({email: req.user.email})
		
		let newAgenda = user.agenda

		newAgenda.push(event)

		newAgenda.sort(function(a,b){
			let timeDiff = new Date(a.date).getTime() - new Date(b.date).getTime()
			return timeDiff
		});

		await User.updateOne({email: req.user.email},{$set: {agenda: newAgenda}})
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

// view other's agenda
// const viewAgenda = async (req, res) => {
// 	try {
// 		let user = await User.findOne( {email: req.params.email}).lean()
// 		for ( of user.events)

		
// 		res.status(300)
//         return res.send("User's agenda is currently empty")
        

//     } catch (err) {
//         res.status(400)
//         return res.send(err.msg)
//     }

	
// } 

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
	getAgenda,
	createEvent,
    editEvent
}
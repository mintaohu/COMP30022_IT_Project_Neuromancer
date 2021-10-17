// connect to Mongoose model
const mongoose = require('mongoose')

const {User, UserSchema} = require('../models/user.js')
const {Event} = require('../models/event.js')

// view own agenda
const getAgenda =  async (req, res) => {
    try {
		let thisUser = await User.findOne( {email: req.body.email}).lean()
		let userAgenda = thisUser.agenda
        if (userAgenda.length > 0){
			res.status(200)
        	return res.json(userAgenda)
        }

		
		res.status(300)
        return res.send("User's agenda is currently empty")
        

    } catch (err) {
        res.status(400)
		console.log("Log in to view your agenda");
        return res.send("Log in to view your agenda")
    }
}

const createEvent = async (req, res) => {
	try {
		const newEvent = new Event({
			sponsor: req.body.email,
			subject: req.body.subject,
			location: req.body.location,
			date: req.body.date,
			participators: [],
			privacy: req.body.privacy,
			details: req.body.details,
			activity: req.body.activity
		});
		await newEvent.save()
		let event = await Event.findOne({sponsor: newEvent.sponsor, subject: newEvent.subject, location: newEvent.location, date: newEvent.date, participators: newEvent.participators, privacy: newEvent.privacy, details: newEvent.details, activity: newEvent.activity})

		let user = await User.findOne({email: newEvent.sponsor})
		
		let newAgenda = user.agenda

		newAgenda.push(event)

		newAgenda.sort(function(a,b){
			let timeDiff = new Date(a.date).getTime() - new Date(b.date).getTime()
			return timeDiff
		});

		await User.updateOne({email: newEvent.sponsor},{$set: {agenda: newAgenda}})
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

		let user = await User.findOne({email: req.user.email})
		let newAgenda = user.agenda

		for (oneEvent of newAgenda) {
			if (!oneEvent._id.toString().localeCompare(req.params.eventId.toString())) {
				let index = newAgenda.indexOf(oneEvent)
				newAgenda[index].subject = req.body.subject
				newAgenda[index].location = req.body.subject
				newAgenda[index].date = req.body.date
            	newAgenda[index].privacy = req.body.privacy
				newAgenda[index].details = req.body.details
			}
		}


		newAgenda.sort(function(a,b){
			let timeDiff = new Date(a.date).getTime() - new Date(b.date).getTime()
			return timeDiff
		});

		await User.updateOne({email: req.user.email},{$set: {agenda: newAgenda}})
		
		res.status(200)
		return res.send("Succeed to edit event")
	}catch (err) {
		res.status(400)
		console.log(err)
	}
}

//view other's agenda
const viewAgenda = async (req, res) => {
	try {
		let otherUser = await User.findOne( {email: req.params.email}).lean()
		let thisUser = await User.findOne( {email: req.user.email}).lean()
		let areFriends = false

		
		for (let friend of thisUser.contact) {
			if (!friend.localeCompare(otherUser.email)){
				areFriends = true
			}
		}		

		let newAgenda = new Array()

		for (let oneEvent of otherUser.agenda) {
			if (areFriends) {
				if (!oneEvent.privacy.localeCompare("Friends Only") || !oneEvent.privacy.localeCompare("Public")) {
					newAgenda.push(oneEvent)
				}
			} else {
				if (!oneEvent.privacy.localeCompare("Public")) {
					newAgenda.push(oneEvent)
				}
			}
		}

		
		res.status(200)
        return res.json(newAgenda)
        

    } catch (err) {
        res.status(400)
        return res.send(err.msg)
    }

	
} 

const joinEvent= async (req, res) => {
    try {
        let currentEvent = await Event.findOne({_id: req.params.eventId}).lean()
		let otherUser = await User.findOne( {email: currentEvent.sponsor}).lean()
		let thisUser = await User.findOne( {email: req.user.email}).lean()
		let areFriends = false
		
		for (let friend of thisUser.contact) {
			if (!friend.localeCompare(otherUser.email)){
				areFriends = true
			}
		}	
		
		for (let participator of currentEvent.participators) {
			if (!participator.localeCompare(req.user.email)) {
				res.status(400)
				return res.send("you have already joined the event")
			}
		}

		let newParticipators = currentEvent.participators
		

		if (!currentEvent.privacy.localeCompare("Friends Only")) {
			if (areFriends) {
				newParticipators.push(req.user.email)
				await Event.updateOne({_id: req.params.eventId},{$set: {participators: newParticipators}})
				currentEvent.participators = newParticipators


				for (let userEmail of newParticipators) {
					let user = await User.findOne({email: userEmail})
					let newAgenda = user.agenda
					let found = false
					for (let oneEvent of newAgenda) {
						if (!oneEvent._id.toString().localeCompare(req.params.eventId.toString())) {
							let index = newAgenda.indexOf(oneEvent)
							newAgenda[index].participators = newParticipators
						}
	
						await User.updateOne({email: userEmail},{$set: {agenda: newAgenda}})
					}

					if (!found) {
						newAgenda.push(currentEvent)
						newAgenda.sort(function(a,b){
							let timeDiff = new Date(a.date).getTime() - new Date(b.date).getTime()
							return timeDiff
						});
						await User.updateOne({email: userEmail},{$set: {agenda: newAgenda}})
					}

				}

				res.status(200)
				return res.send("Succeed to join the event")

				
				
			} else {
				res.status(400)
				return res.send("you have no permission to join the event")
			}
		}

		else if (!currentEvent.privacy.localeCompare("Public")) {
			newParticipators.push(req.user.email)
			await Event.updateOne({_id: req.params.eventId},{$set: {participators: newParticipators}})
			currentEvent.participators = newParticipators

			for (let userEmail of newParticipators) {
			
				let found = false
				let user = await User.findOne({email: userEmail})
				let newAgenda = user.agenda
				
				for (let oneEvent of newAgenda) {
					if (!oneEvent._id.toString().localeCompare(req.params.eventId.toString())) {
						found = true
						let index = newAgenda.indexOf(oneEvent)
						newAgenda[index].participators = newParticipators
						await User.updateOne({email: userEmail},{$set: {agenda: newAgenda}})
					}
					
				} 

				if (!found) {
					newAgenda.push(currentEvent)

					newAgenda.sort(function(a,b){
						let timeDiff = new Date(a.date).getTime() - new Date(b.date).getTime()
						return timeDiff
					});

					await User.updateOne({email: userEmail},{$set: {agenda: newAgenda}})
				}

			}

			res.status(200)
			return res.send("Succeed to join the event")
				
		}

		else if (!currentEvent.privacy.localeCompare("Private")) {
			res.status(400)
			return res.send("you have no permission to join the event")
		} else {
			res.status(400)
			return res.send("error")
		}


	}catch (err) {
		res.status(400)
		console.log(err)
	}
}

const quitEvent= async (req, res) => {
	try {
		let currentEvent = await Event.findOne({_id: req.params.eventId}).lean()
		let otherUser = await User.findOne( {email: currentEvent.sponsor}).lean()
		let newParticipators = currentEvent.participators
		let index = newParticipators.indexOf(req.user.email)
		newParticipators.splice(index, 1)
		await Event.updateOne({_id: req.params.eventId},{$set: {participators: newParticipators}})

		for (let userEmail of currentEvent.participators) {
			let user = await User.findOne({email: userEmail})
			let newAgenda = user.agenda
			
			for (let oneEvent of newAgenda) {
				if (!oneEvent._id.toString().localeCompare(req.params.eventId.toString())) {
					let index = newAgenda.indexOf(oneEvent)
					newAgenda[index].participators = newParticipators
				}
				
				await User.updateOne({email: userEmail},{$set: {agenda: newAgenda}})
			
				
			}
		}

		let thisUser = await User.findOne({email: req.user.email})
		thisEvent = await Event.findOne({_id: req.params.eventId}).lean()
		newAgenda = thisUser.agenda
		index = thisUser.agenda.indexOf(thisEvent)
		newAgenda.splice(index, 1)
		await User.updateOne({email: req.user.email},{$set: {agenda: newAgenda}})


		res.status(200)
		res.send("Succeed to quit the event")
		
	} catch (err) {
		res.status(400)
		console.log(err)
	}

}

const deleteEvent= async (req, res) => {
	try {
		let currentEvent = await Event.findOne({_id: req.params.eventId}).lean()
		let otherUser = await User.findOne( {email: currentEvent.sponsor}).lean()

		if (!currentEvent.sponsor.localeCompare(req.user.email)) {
			await Event.deleteOne({_id: req.params.eventId})

			for (let userEmail of currentEvent.participators) {
				let user = await User.findOne({email: userEmail})
				let newAgenda = user.agenda

				for (let oneEvent of newAgenda) {
					if (!oneEvent._id.toString().localeCompare(req.params.eventId.toString())) {
						let index = newAgenda.indexOf(oneEvent)
						newAgenda.splice(index, 1)
					}
					
					await User.updateOne({email: userEmail},{$set: {agenda: newAgenda}})
				}
			}

			res.status(200)
			return res.send("Succeed to delete the event")
			

		} else {
			res.status(400)
			return res.send("You have no permission to delete the event")
		}

	} catch (err) {
		res.status(400)
		console.log(err)
	}


}
// export the functions
module.exports = {
	getAgenda,
	createEvent,
    editEvent,
	viewAgenda,
	joinEvent,
	quitEvent,
	deleteEvent
}
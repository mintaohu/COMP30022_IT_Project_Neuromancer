const mongoose = require("mongoose")


const EventSchema = new mongoose.Schema({
	subject: { type: String, required: true },
	location: { type: String, required: true },
	date: { type: Date, required: true },
    participatorID: [{type: String}],
    sponsorID: [{type: String}],
    privacy: { type: String, enum: ["Private", "Public", "Friends Only"],required: true },
    details: { type: String, required: true },
})

const Event = mongoose.model("Event", EventSchema)
module.exports = {Event, EventSchema}
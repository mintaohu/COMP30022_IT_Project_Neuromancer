const mongoose = require("mongoose")


const AgendaSchema = new mongoose.Schema({
	what: { type: String, required: true },
	where: { type: String, required: true },
	when: { type: Date, required: true },
    who: { type: String, required: true },
    // not string type in privacy and icon, need change
    privacy: { type: String, required: true },
    icon: { type: String, required: true },
    details: { type: String, required: true },
})

const Agenda = mongoose.model("Agenda", AgendaSchema)
module.exports = {Agenda, AgendaSchema}
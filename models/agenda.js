const mongoose = require("mongoose")


const agendaSchema = new mongoose.Schema({
	what: { type: String, required: true },
	where: { type: String, required: true },
	when: { type: Date, required: true },
    who: { type: [], required: true },
    // not string type in privacy and icon, need change
    privacy: { type: String, required: true },
    icon: { type: String, required: true },
    details: { type: String, required: true },
})

const Agenda = mongoose.model("Agenda", agendaSchema)
module.exports = { Agenda }
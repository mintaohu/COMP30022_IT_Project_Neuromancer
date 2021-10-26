const mongoose = require("mongoose")


const AliasSchema = new mongoose.Schema({
    user: { type: String, required: true },
    friend: { type: String, required: true },
    name: { type: String,  required: true },
})

const Alias = mongoose.model("Alias", AliasSchema)
module.exports = {Alias, AliasSchema}
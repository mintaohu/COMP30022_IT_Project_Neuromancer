const mongoose = require("mongoose")


const FriendRequestSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true }
})

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema)
module.exports = {FriendRequest, FriendRequestSchema}
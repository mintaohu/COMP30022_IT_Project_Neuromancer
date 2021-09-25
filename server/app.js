const express = require("express")
const app = express()
const mongoose = require("mongoose")
const connectionString = "mongodb+srv://xuanjianzhang:eWcZLhpj2aUMPIB8@seeya.n8mo7.mongodb.net/SeeYa?retryWrites=true&w=majority"
const UserModel = require("./models/User")

// receive information from front-end in json form
app.use(express.json())

mongoose.connect(connectionString,{
    useNewUrlParser : true,
});






app.listen(5000,()=>{
    console.log("Seeya is listening...")
})
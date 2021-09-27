const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require("mongoose")
const { userInfo } = require("os")
const connectionString = "mongodb+srv://xuanjianz:kMlXGvq8u0aLkNMc@testing.wjdf1.mongodb.net/test"
const UserModel = require("./models/User")

// receive information from front-end in json form
app.use(express.json())

app.use(cors())



mongoose.connect(connectionString,{
    useNewUrlParser : true,
},function(){
    console.log('Mongoose connection established')
});


app.post("/insert", async (req,res)=>{

    const name = req.body.name
    const email = req.body.email
    const tel = req.body.tel
    

    const user = new UserModel({name: name, email: email, tel: tel})

    try {
        await user.save();
        res.send("inserted data");
    } catch (error) { 
        console.log(error)
    }
})

app.get("/read", async (req,res)=>{
    UserModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }

        res.send(result)
    })
})

app.listen(5000,()=>{
    console.log("Seeya is listening...")
})
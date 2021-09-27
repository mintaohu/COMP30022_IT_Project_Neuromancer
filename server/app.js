const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require("mongoose")
const { userInfo } = require("os")
const connectionString = "mongodb+srv://xuanjianz:kMlXGvq8u0aLkNMc@testing.wjdf1.mongodb.net/test"
const UserModel = require("./models/User")
const encryption = require('./utils/encryption')

// receive information from front-end in json form
app.use(express.json())

app.use(cors())



mongoose.connect(connectionString,{
    useNewUrlParser : true,
},function(){
    console.log('Mongoose connection established')
});


app.post("/register", async (req,res)=>{
    // try {
    //     foundUser = UserModel.find((data) => req.body.email === data.email)
    //     if(!foundUser){
            const name = req.body.name
            const email = req.body.email
            const tel = req.body.tel
            const password = encryption.encrypt(req.body.password,10)


            const user = new UserModel({name: name, email: email, tel: tel, password: password})

            try {
                await user.save();
                res.send("inserted data");
            } catch (error) { 
                console.log(error)
            }
        // }else{
        //     res.send("The email has been used")
        // }
    // } catch (error) {
        
    //     console.log("The email has been used")
    // }
    
})

app.get("/allusers", async (req,res)=>{
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
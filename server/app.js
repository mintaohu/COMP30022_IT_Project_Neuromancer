const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require("mongoose")
const { userInfo } = require("os")
const connectionString = "mongodb+srv://xuanjianz:kMlXGvq8u0aLkNMc@testing.wjdf1.mongodb.net/test"
const UserModel = require("./models/User")
const encryption = require('./utils/encryption')
const sanitize = require('mongo-sanitize');

// receive information from front-end in json form
app.use(express.json())

app.use(cors())



mongoose.connect(connectionString,{
    useNewUrlParser : true,
},function(){
    console.log('Mongoose connection established')
});





app.post("/register", add_user = (req, res) => {

    try{

        // receive data from post body
        let user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            tel: req.body.tel,
            password: encryption.encrypt(req.body.password,10)
        })

        // find by login_id, return the 'password' field of the model
        let query = UserModel.findOne({email: user.email})
        // the find will return the 'password' field of the model
        query.exec((err, resp) => {
            if(err) {
                console.log('error: ' + err);
            } else {

                // if no account record match, can add one
                if(resp === null) {
                    user.save(function (err, res) {
                        if (err) {
                            console.log("Error:" + err);
                        }
                        else {
                            console.log("User Account saved");
                        }
                    });

                } else {
                    console.log("User already exists!")
                }
            }
        });

    } catch (e) {
        console.log(e)
    }


});


app.get("/allusers", async (req,res)=>{
    UserModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }

        res.send(result)
    })
})

app.post("/login", check_login = (req, res) => {
    try {
        // encrypt to bcrypt
        let user_plain_password = sanitize(req.body.password);
        let user = {
            name: "req.body.name,",
            email: req.body.email,
            tel: "tel",
            password: encryption.encrypt(req.body.password,10)
        }


        // find by login_id, return the 'password' field of the model
        let query = UserModel.findOne({ email:user.email })
            // the find will return the 'password' field of the model
        query.select('password');
        query.exec((err, resp) => {
            if (err) {
                console.log('error: ' + err);
            } else {

                // if no login id record match
                if (resp === null) {
                    console.log('no match password')
                } else {
                    // if login id record match
                    // if password equals the record
                    /* Compare plain input password with encrypted database record */
                    if (encryption.compare(user_plain_password, resp.password)) {
                        console.log("login succesfull")
                    } else {
                        console.log("login failed")
                    }
                }
            }
        });
    } catch (e) {
        console.log(e)
    }

})





app.listen(5000,()=>{
    console.log("Seeya is listening...")
})
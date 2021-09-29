// add our router
const express = require('express')
const userRouter = express.Router()
const bodyParser = require('body-parser');


userRouter.use(bodyParser.urlencoded({extended:true}))


// connect to controller
const userController = require('../controllers/userController.js')

// process routes by calling controller functions
userRouter.get('/test', (req, res) => userController.getAllUsers(req, res))

userRouter.get('register', (req, res) => {
	res.render('register')
})

userRouter.get('login', (req, res) => {
	res.render('login')
})

userRouter.post('/register', userController.register)

userRouter.post('/register', userController.register)

userRouter.post('/login', userController.loginUser)



// export the router
module.exports = userRouter
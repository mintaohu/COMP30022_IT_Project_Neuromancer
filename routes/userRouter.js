// add our router
const express = require('express')
const userRouter = express.Router()


// connect to controller
const userController = require('../controllers/userController.js')

// process routes by calling controller functions
userRouter.get('/test', (req, res) => userController.getAllUsers(req, res))

userRouter.post('/login', async (req, res) => userController.userLogin(req, res))

userRouter.post('/register', async (req, res) => userController.userRegister(req, res))


// export the router
module.exports = userRouter
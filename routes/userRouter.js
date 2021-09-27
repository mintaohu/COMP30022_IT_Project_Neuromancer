// add our router
const express = require('express')
const userRouter = express.Router()


// connect to controller
const userController = require('../controllers/userController.js')

// process routes by calling controller functions
<<<<<<< HEAD
userRouter.get('/', (req, res) => userController.getAllUsers(req, res))
=======
userRouter.get('/test', (req, res) => userController.getAllUsers(req, res))
>>>>>>> backend


// export the router
module.exports = userRouter
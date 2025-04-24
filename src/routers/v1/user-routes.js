const express = require('express')
const {UserController} = require('../../controllers/index');
const {UserMiddleware} = require('../../middleware')
const router = express.Router();


router.post('/signUp',
    UserMiddleware.validateCreateUser,
    UserController.createUser
)

module.exports = router;
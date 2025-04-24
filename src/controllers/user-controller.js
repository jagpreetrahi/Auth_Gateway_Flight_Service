const {UserService} = require('../services')
const {StatusCodes} = require('http-status-codes')
const {SuccessResponse , ErrorResponse} = require('../utils/common/index')

async function createUser(req , res) {

    try {
        const user = await UserService.signUp({
            FirstName : req.body.FirstName,
            LastName : req.body.LastName,
            email : req.body.email,
            password : req.body.password
        })
        SuccessResponse.data = user
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
}

module.exports = {
    createUser
}

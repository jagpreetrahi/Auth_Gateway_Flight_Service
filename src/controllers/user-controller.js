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

async function signInUser(req , res) {

    try {
        const user = await UserService.signIn({
            email : req.body.email,
            password : req.body.password
        })
        
        
        SuccessResponse.data = user
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
}

async function addRoleToUser(req , res) {
    
    try {
        const role = await UserService.addRoleToUser({

            role : req.body.role,
            id : req.body.id
        })
        SuccessResponse.data = role;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
}

module.exports = {
    createUser,
    signInUser,
    addRoleToUser
}

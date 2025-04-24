const {ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');

const validateCreateUser = (req, res ,next) => {
  
    
    const message = "Something went wrong while creating a User";
    if(!req.body.FirstName){
        ErrorResponse.message = message;
        ErrorResponse.error = {explanation :  "You are not providing the correct details"}
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);

    }
    if(!req.body.LastName){
        ErrorResponse.message = message;
        ErrorResponse.error = {explanation :  "You are not providing the correct details"}
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);

    }
    if(!req.body.email){
        ErrorResponse.message = message;
        ErrorResponse.error = {explanation :  "You are not providing the correct details"}
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);

    }
    if(!req.body.password){
        ErrorResponse.message = message;
        ErrorResponse.error = {explanation :  "You are not providing the correct details"}
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);

    }
  
    next();
}

module.exports = {
    validateCreateUser
}
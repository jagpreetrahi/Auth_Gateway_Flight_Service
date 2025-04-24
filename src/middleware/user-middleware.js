const {ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');
const {UserService} = require('../services')

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

function checkAuthenticate(req, res , next){

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

    const authHeader = req.headers.authorization;
    ErrorResponse.error = {explanation : "Authentication header not found"}

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

   try {
       const response = UserService.isAuthenticated(authHeader)
       if(response){
           req.user = response // setting the user.id to the req.user 
           next();
       }
   } catch (error) {
      return res.status(error.statusCode).json(error)
   }
}

module.exports = {
    validateCreateUser,
    checkAuthenticate
}
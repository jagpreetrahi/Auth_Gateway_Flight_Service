const {ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');
const {UserService} = require('../services')

const validateCreateUser = (req, res ,next) => {
  
   
    const message = "Something went wrong while creating a User";
    if(req.body.FirstName && req.body.LastName && req.body.email && req.body.password){
        
        next();
    }
    else if(req.body.email && req.body.password){
        next();
    }
    else{
        ErrorResponse.message = message;
        ErrorResponse.error = {explanation :  "You are not providing the correct details"}
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
   
   
}

async function checkAuthenticate(req, res , next){

  
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    ErrorResponse.error = {explanation : "Authentication header not found"}

    if(!authHeader){
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

   try {
       const response = await UserService.isAuthenticated(authHeader)

       if(response){
           req.user = response // setting the user.id to the req.user 
           next();
       }
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
   }
}

async function isAdmin(req, res ,next) {
    
    try {
        const response = await UserService.isAdmin(req.user);
        if(!response){
            return res.status(StatusCodes.UNAUTHORIZED).json("user not authorized for this action")
        }

        next();
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    
}

module.exports = {
    validateCreateUser,
    checkAuthenticate,
    isAdmin
}
const {UserRepository} = require('../repository')
const AppError = require('../utils/errors/app-error')
const {StatusCodes} = require('http-status-codes')
const {Auth} = require('../utils/common')


const userRepo = new UserRepository();


async function signUp(data){

    try {
        const user = await userRepo.create(data);
        return user;
    } catch (error) {
       
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST)
        }
           throw new AppError("Cannot create a user with same email" , StatusCodes.BAD_REQUEST);
    }
}

async function  signIn(data) {
    
    try {
        const user = await userRepo.getUserEmail(data.email);
        if(!user){
            throw new AppError("User does not exist in the data" , StatusCodes.NOT_FOUND)
        }

        const password = Auth.comparePassword(data.password , user.password);
        if(!password){
            throw new AppError("Invalid Password" , StatusCodes.BAD_REQUEST)
        }
        const jwt = Auth.creatToken({id : user.id, email : user.email})
        return jwt;
    } catch (error) {
       
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST)
        }
           throw new AppError("Cannot create a user with same email" , StatusCodes.BAD_REQUEST);
    }
}

async function isAuthenticated(token){

    try {
        if(!token){
            throw new AppError("Token is missing" , StatusCodes.BAD_REQUEST)
        }
        const response = Auth.verifyToken(token);
        const user = await userRepo.get(response);
        if(!user){
            throw new AppError("No user found" , StatusCodes.NOT_FOUND)
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invalid jwt token' , StatusCodes.BAD_REQUEST)
        }
        if(error.name == 'TokenExpiredError'){
            throw new AppError('JWT token expiry' , StatusCodes.BAD_REQUEST)
        }

        throw new AppError("Something went Wrong" , StatusCodes.INTERNAL_SERVER_ERROR)
    }

 


}

module.exports = {
    signUp,
    signIn,
    isAuthenticated
}

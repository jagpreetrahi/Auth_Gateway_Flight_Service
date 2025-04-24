const {UserRepository} = require('../repository')
const AppError = require('../utils/errors/app-error')


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
           throw new AppError("Cannot create a same City" , StatusCodes.BAD_REQUEST);
    }
}

module.exports = {
    signUp
}

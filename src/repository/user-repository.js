const CrudRepository = require('./crud-repository')
const {User} = require('../models')

class UserRepository extends CrudRepository{

    constructor(){
        super(User)
    }

    async getUserEmail(userEmail){
        const user = await User.findOne({where : {email : userEmail}});
        return user;

    }
}

module.exports = UserRepository
const CrudRepository = require('./crud-repository')
const {user_role} = require('../models');


class RoleRepostiory extends CrudRepository{

    constructor(){
        super(user_role)
    }

    async getUserRole(name){
        const role = await user_role.findOne({where : {name : name}});
        return role;

    }
}

module.exports = RoleRepostiory
const CrudRepository = require('./crud-repository')
const {Role} = require('../models');


class RoleRepostiory extends CrudRepository{

    constructor(){
        super(Role)
    }

    async getUserRole(name){
        const role = await Role.findOne({where : {name : name}});
        return role;

    }
}

module.exports = RoleRepostiory
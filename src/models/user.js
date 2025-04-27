'use strict';
const {
  Model
} = require('sequelize');
const {ServerConfig} = require('../config')
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role , {through : 'user_roles', as : 'role'})
    }
  }
  User.init({
    FirstName: {
        type : DataTypes.STRING,
        allowNull : false
    },
    LastName:  {
      type : DataTypes.STRING,
      allowNull : false
  },
    email:  {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        isEmail : true
      }
  },
    password:  {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
          len : [4, 15]
      }
  }
  }, 
   {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(function encrypt(user){
    const hashPassword =  bcrypt.hashSync(user.password , +ServerConfig.SALT_ROUNDS)
    user.password = hashPassword;
  })
  return User;
};
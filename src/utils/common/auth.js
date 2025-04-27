const bcrypt = require('bcryptjs')
const {ServerConfig} = require('../../config')
const jwt = require('jsonwebtoken')

function comparePassword(previousPassword , hashedPassword){

    try {
        return bcrypt.compareSync(previousPassword , hashedPassword);
    
    } catch (error) {
        throw error;
    }
} 

function creatToken(inputData){
    try {
        const token = jwt.sign(inputData , ServerConfig.JWT_SECRET, {expiresIn : ServerConfig.JWT_EXPIRY})
        return token
    } catch (error) {
        throw error
    }
}

function verifyToken(token){
    try {
        console.log("token" , token);
        const verify = jwt.verify(token, ServerConfig.JWT_SECRET);
        
        return verify;
    } catch (error) {
        throw error;
    }
}




module.exports = {
    comparePassword,
    verifyToken,
    creatToken
}
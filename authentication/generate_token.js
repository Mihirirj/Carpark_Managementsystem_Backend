const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

module.exports = function issue_token(userId , userType , email){
    dotenv.config()
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: userId,
        userType: userType,
        email:email,
    }
    console.log(data)
    const token = jwt.sign(data, jwtSecretKey);
      return token
}
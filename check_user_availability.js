var connection = require('./service/connection')

const check_user_availability = async email =>{
    connection.query("SELECT * FROM user WHERE email='"+email+"'", function (err, result, fields) {
        if(result.length!=0){
            return {
                state : true,
                userType:result[0].user_type,
                userId : result[0].user_id
            }
        }  
        else{
            return false
        } 
      });
}

module.exports = {check_user_availability}
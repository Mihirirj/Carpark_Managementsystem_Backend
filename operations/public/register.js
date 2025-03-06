var connection = require('../../service/connection')
var generate_token = require('../../authentication/generate_token')

module.exports =async function register(req , res , type){
    try{
        var sql = "INSERT INTO user (email ,user_type , login) " + "VALUES ('"+req.body.email+"','"+req.body.type+"' , TRUE)"
        connection.query(sql, function (err, result, fields) {
            if(err){
                res.send({
                    state:false,
                    error:err
                })
            }
            else{
                const token = generate_token(result.insertId ,req.body.type,req.body.email)
                res.send({
                    token:token,
                    type:req.body.type,
                })
            }
      });
    }
    catch{
        console.log("catch")
        return "catch"
    }
}
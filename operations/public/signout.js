var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function method(req , res){
    try{
        var validity = await validate_token(req , 1)
        console.log(validity)
        if (!validity.condition){
            var validity = await validate_token(req , 2)
            console.log(validity)
            if (!validity.condition){
                res.send("not valid")
                return
        }
        }
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
   try{
    var sql = "UPDATE user " + "SET login = FALSE WHERE user_id = "+validity.userId
    connection.query(sql, function (err, result2, fields) {
        if (err) {
            res.send(err)
            return
        }
        else{
            res.send({
                state:true
            })
        }
        })
   }
   catch{
    res.send({
        state:false
    })
   }
}
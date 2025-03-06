var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports =async function get_parks(req , res){
  try{
    var validity = await validate_token(req , 2)
    console.log(validity)
    if (!validity.condition){
        res.send("not valid")
        return
    }
}
catch{
    console.log("catch")
    res.send("not valid")
    return
}
    connection.query("SELECT * FROM booking WHERE user_id="+validity.userId+" AND WHERE reservation=TRUE", function (err, result, fields) {
        if (err) res.send(err);
        res.send(result)   
      });
}
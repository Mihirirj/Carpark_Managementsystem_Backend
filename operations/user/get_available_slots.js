var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')
const { response } = require('express')

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
console.log(req.params.park_id)
    connection.query("SELECT * FROM slot WHERE park_id = "+req.params.park_id+" AND availability = TRUE", function (err, result, fields) {
        if (err) res.send(err);
        res.send(result)  
     }) 
}
var connection = require('../../service/connection')
var uridata = require('../qrOperation/decode_uri')
var validate_token = require('../../authentication/authenticate')

function format (date) {  
    if (!(date instanceof Date)){
      throw new Error('Invalid "date" argument. You must pass a date instance')
    }
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return `${time}`
  }
module.exports = async function method(req , res){
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
    var current_time = format(new Date)
    const data = await uridata(req.body.uri)
    connection.query("SELECT * FROM booking WHERE park_id= "+data.park_id+" AND enter = TRUE AND user_id = "+validity.userId, function (err, result, fields) {
        if (err) {
            res.send(err)
            return
        }
        else{
            if(result[0].researved){
                //do only extra payment
            }
    var sql = "UPDATE slot " + "SET availability = TRUE WHERE slot_id = "+result[0].slot_id
        connection.query(sql, function (err, result2, fields) {
            if (err) {
                res.send(err)
                return
            }
        var sql = "UPDATE booking " + "SET duration = "+duration+" AND end_time = "+current_time+" WHERE booking_id = "+req.params.booking_id
        connection.query(sql, function (err, result2, fields) {
            if (err) {
                res.send(err)
                return
            }
            })
            })
        res.send("success")
}
    })
}
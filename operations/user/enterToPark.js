var connection = require('../../service/connection')
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
    var sql = "INSERT INTO booking (date , start_time ,end_time,duration , vehicle_no ,user_id , slot_id,park_id, reservation , enter) " + "VALUES ('"+req.body.date+"',"+req.body.start_time+","+req.body.end_time+",0,'"+req.body.vehicle_no+"',"+validity.userId+","+req.body.slot_id+","+req.body.park_id+",FALSE,TRUE)"
    connection.query(sql, function (err, result, fields) {
    if (err) {
        res.send(err)
        return
    }
    var sql = "UPDATE slot " + "SET availability = FALSE WHERE slot_id = "+req.body.slot_id
        connection.query(sql, function (err, result2, fields) {
            if (err) {
                res.send(err)
                return
            }
            })
    });
        res.send("success")
}
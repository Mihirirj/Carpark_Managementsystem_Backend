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
    connection.query("SELECT * FROM booking WHERE booking_id="+req.params.booking_id, function (err, result, fields) {
        if (err) {
            res.send(err)
            return
        };
         var current_time = format(new Date)
         if(current_time<result.start_time){
            //do refund to user
            var sql = "DELETE FROM booking WHERE booking_id = "+req.params.booking_id
            connection.query(sql, function (err, result2, fields) {
                if (err) {
                    res.send(err)
                    return
                };
            });
         }
        var sql = "UPDATE slot " + "SET availability = TRUE WHERE slot_id = "+result.slot_id
        connection.query(sql, function (err, result2, fields) {
            if (err) {
                res.send(err)
                return
            }
            })
      });
    
        res.send("success")
}
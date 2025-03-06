var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

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
    connection.query("SELECT * FROM booking WHERE user_id= "+validity.userId+" AND enter = TRUE", function (err, result, fields) {
        if (err) {
            res.send(err)
            return
        }
        else{
            if(result.length!=0){
                res.send("already available a booking")
            }
        else{
    var sql = "INSERT INTO booking (date , start_time ,end_time,duration , vehicle_no ,user_id , slot_id,park_id, reservation , enter) " + "VALUES ('"+req.body.date+"',"+req.body.start_time+","+req.body.end_time+","+req.body.duration+",'"+req.body.vehicle_no+"',"+validity.userId+","+req.body.slot_id+","+req.body.park_id+",TRUE,FALSE)"
    connection.query(sql, function (err, result, fields) {
    console.log(result)
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
            res.send("success")
            })
    })
        }
    }
})
}
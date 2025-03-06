var connection = require('../../service/connection')
var uridata = require('../qrOperation/decode_uri')
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

    const data = await uridata(req.body.uri)
    connection.query("SELECT booking_id FROM booking WHERE park_id= "+data.park_id+" AND enter = FALSE AND user_id = "+validity.userId, function (err, result, fields) {
        if (err) {
            res.send(err)
            return
        }
        else{
            if(result.length===0){
                res.send("not available booking")
            }
        else{
    var sql = "UPDATE booking " + "SET enter = TRUE WHERE booking_id = "+result[0].booking_id
        connection.query(sql, function (err, result2, fields) {
            if (err) {
                res.send(err)
                return
            }
    });
}
        }
})
        res.send("success")
}
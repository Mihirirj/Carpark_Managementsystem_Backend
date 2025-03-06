var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function add_feedback(req , res){
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
    connection.query("SELECT * FROM carpark WHERE park_id="+req.params.park_id, function (err, result, fields) { 
        if (err) {
            res.send(err)
            return
        }
        var rate = (result.rate * result.rate_amount + req.params.rate) / (result.rate_amount + 1)
        var sql = "UPDATE carpark " + "SET rate = "+rate+" WHERE park_id = "+req.params.park_id
        connection.query(sql, function (err, result2, fields) {
            if (err) {
                res.send(err)
                return
            }
            })
    });
        res.send("success")
}
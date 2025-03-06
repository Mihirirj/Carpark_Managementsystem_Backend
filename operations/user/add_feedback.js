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
        var sql = "INSERT INTO feedback (feedback ,park_id, user_id) " + "VALUES ('"+req.body.feedback+"',"+req.body.parkId+","+validity.userId+")"
        connection.query(sql, function (err, result, fields) {
        if (err) {
            res.send(err)
            return
        }
        });
        res.send("success")
}
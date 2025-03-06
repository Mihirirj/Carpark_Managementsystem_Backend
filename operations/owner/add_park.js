var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function add_park(req , res){
    try{
        var validity = await validate_token(req , 1)
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
        var sql = "INSERT INTO carpark (name,longitude , latitude,price ,url , owner_id , spot_size , special_note , facilities , rate , rate_amount , admin_status) " + "VALUES ('"+req.body.name+"','"+req.body.longitude+"','"+req.body.latitude+"',"+req.body.price+",'"+req.body.url+"',"+validity.userId+" , '"+req.body.spot_size+"' , '"+req.body.special_note+"' , '"+req.body.facilities+"' ,0,0 , 'pending')"
        connection.query(sql, function (err, result, fields) {
        if (err) {
            res.send(err)
            return
        }
        for(let i=0; i<req.body.slot_count; i++){
        var sql = "INSERT INTO slot (availability ,park_id) " + "VALUES ('TRUE',"+result.insertId+")"
        connection.query(sql, function (err2, result2, fields) {
        });
        }
        });
        res.send("success")
}
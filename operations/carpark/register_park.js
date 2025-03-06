var connection = require('../../service/connection')

module.exports = async function add_park(req , res){
    var sql = "INSERT INTO owner (position) " + "VALUES ('"+req.body.position+"')"
        connection.query(sql, function (err, result, fields) {
            var sql = "INSERT INTO carpark (longitude , latitude ,url,owner_id) " + "VALUES ('"+req.body.longitude+"','"+req.body.latitude+"','"+req.body.url+"'"+result.insertId+")"
            connection.query(sql, function (err, result2, fields) {
            if (err) {
                res.send(err)
                return
            }
            for(let i=0; i<req.body.slots.length; i++){
                var sql = "INSERT INTO slot (slot_price , availability ,park_id) " + "VALUES ('"+req.body.slots[i].price+"','TRUE',"+result2.insertId+")"
            connection.query(sql, function (err2, result3, fields) {
            });
            }
            });
        });
        res.send("success")
}
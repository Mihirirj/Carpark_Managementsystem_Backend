var connection = require('../../service/connection')

module.exports =async function get_parks(req , res){
    connection.query("SELECT * FROM slot WHERE park_id="+req.params.park_id+" AND availability = TRUE", function (err, result, fields) {
        if (err) res.send(err);
        res.send(result)   
      });
}
var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')
const { response } = require('express')

module.exports =async function get_parks(req , res){
//   try{
//     var validity = await validate_token(req , 4)
//     console.log(validity)
//     if (!validity.condition){
//         res.send("not valid")
//         return
//     }
// }
// catch{
//     console.log("catch")
//     res.send("not valid")
//     return
// }
    connection.query("SELECT COUNT(*) as count FROM carpark", function (err, result, fields) {
        if (err) res.send(err);
        connection.query("SELECT COUNT(*) as count FROM carpark WHERE admin_status = 'pending'", function (err, result2, fields) {
            if (err) res.send(err);
            connection.query("SELECT COUNT(*) as count FROM user WHERE user_type = 'owner'", function (err, result3, fields) {
                if (err) res.send(err);
                connection.query("SELECT COUNT(*) as count FROM user WHERE user_type = 'user'", function (err, result4, fields) {
                    if (err) res.send(err);
                    connection.query("SELECT COUNT(*) as count FROM feedback", function (err, result5, fields) {
                        if (err) res.send(err);
                        let response = {
                            park_count:result[0].count,
                            request_count:result2[0].count,
                            park_owner_count:result3[0].count,
                            vehicle_owner_count:result4[0].count,
                            feedback_count:result5[0].count
                        }
                        res.send(response)
                      });
                  });
              });
          });
      });
}
var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')
const { response } = require('express')

module.exports =async function get_parks(req , res){
//   try{
//     var validity = await validate_token(req , 2)
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
    connection.query("SELECT * FROM carpark WHERE admin_status = 'confirm'", function (err, result, fields) {
        if (err) res.send(err);
        let responses = []
        for (let park in result){
            let park_ = {
                name : result[park].name,
                latitude:result[park].latitude,
                longitude:result[park].longitude
            }
            responses.push(park_)
        }
        res.send(responses)
      });
}
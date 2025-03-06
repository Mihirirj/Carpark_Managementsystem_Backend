var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports =async function get_parks(req , res){
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
    connection.query("SELECT * FROM carpark WHERE owner_id="+validity.userId, function (err, result, fields) {
      let response = []
        if (err) res.send(err);
        else{
          let parkIds = []
          for(let i=0; i<result.length; i++){
            parkIds.push(result[i].park_id)
          }
          connection.query("SELECT * FROM booking", function (err, result2, fields) {
            if (err) res.send(err);
            for(let i=0; i<result2.length; i++){
              if(parkIds.includes(result2[i].park_id)){
                let resp = {
                  park_id : result2[i].park_id,
                  bookings : result2
                }
                response.push(resp)
              }
            }
            
            res.send(response)
          })
      }
      });
}
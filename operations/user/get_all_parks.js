var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')
const { response } = require('express')

module.exports =async function get_parks(req , res){
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
    connection.query("SELECT * FROM carpark WHERE admin_status = 'confirm'", function (err, result, fields) {
        if (err) res.send(err);
        let responses = []
        connection.query("SELECT * FROM slot", function (err, result2, fields) {
            if (err) res.send(err);
            for(let i =0; i<result.length; i++){
                let availability = 0
                for(let j =0; j<result2.length; j++){
                    if(result[i].park_id===result2[j].park_id && result2.availability){
                        availability++
                    }
                }
                let response = {
                    park : result[i],
                    availability : availability,
                    status:false
                }
                if(availability===0){
                    response.status = true
                }
                responses.push(response)
            }
            res.send(responses)  
        }) 
      });
}
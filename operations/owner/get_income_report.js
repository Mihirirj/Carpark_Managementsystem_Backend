const { response } = require('express');
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
    try{
        connection.query("SELECT * FROM carpark WHERE owner_id="+validity.userId, function (err, result, fields) {
            if (err) res.send(err);
            let responses_total = []
            connection.query("SELECT * FROM booking", function (err, result2, fields) {
                if (err) {
                    res.send(err)
                    return
                };
                for(let i=0; i<result2.length; i++){
                    
                }
                connection.query("SELECT * FROM carpark", function (err, price, fields) {
                    if (err) {
                        res.send(err)
                        return
                    };  
                  });
                var total_income = 0
                var responses = []
                for (let i=0; i<result.length; i++){
                        var cost = result[i].duration*price
                        const response = {
                            date : result[i].date,
                            duration : result[i].duration,
                            slot_id : result[i].slot_id,
                            slot_price : price,
                            total : cost,
                        }
                        total_income+=cost
                        responses.push(response)  
                } 
                let resp = {
                    park_id:result[i].park_id,
                    reponse:responses,
                    total:total_income
                }
            })
          });
    }
    catch{
        res.send("not valid")
    }
}
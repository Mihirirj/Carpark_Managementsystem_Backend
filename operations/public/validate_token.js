
var validate_token = require('../../authentication/authenticate')

module.exports = async function validate(req , res , api_no){
    var validity = await validate_token(req , api_no)
    console.log("validity2 ",validity)
    if(validity.condition){
        res.send("valid")
    }
    else{
        res.send("invalid")
    }
}
const CryptoJS = require('crypto-js');
require('dotenv').config();

module.exports = async function generate_uri(req , res){
    const data = req.params.park_id// data to be encoded
    const key =process.env.CRYPTO_KEY;
    const uri = CryptoJS.AES.encrypt(data.toString(), key).toString();
    res.send({
        uri : uri
    })
} 
require('dotenv').config();
module.exports = async function decode_uri(uri){
    const key =process.env.CRYPTO_KEY;
    const decryptedData = CryptoJS.AES.decrypt(uri, key).toString(CryptoJS.enc.Utf8);
    const data = {
        park_id : parseInt(decryptedData),
    }
    return data
}
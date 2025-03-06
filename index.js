require('dotenv').config();
require('./service/connection')
require('./operations/automate/automate')
var express = require('express')
const cron = require("node-cron");
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
const dotenv = require('dotenv');
dotenv.config()
var app = express();
var owner_route = require('./routes/owner_route')
var user_route = require('./routes/user_route')
var carpark_router = require('./routes/carpark_router')
var login_router = require('./routes/login')
var admin_router = require('./routes/admin_router')
var generate_token = require('./authentication/generate_token')
var register = require('./operations/public/register')
var utils = require ('./routes/utils');
var connection = require('./service/connection')


app.use(cors())
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/owner',owner_route)
app.use('/api/user',user_route)
app.use('/api/carpark',carpark_router)
app.use('/api/auth',login_router)
app.use('/api/admin',admin_router)

app.get (process.env.REDIRECT_URI_LOGIN, async (req, res) => {
    const authorization_token = req.query;
    console.log ({auth_server_response: authorization_token});
    try {
      const response = await utils.get_access_token (authorization_token.code);
      const {access_token} = response.data; 
      console.log({access_token:access_token})
      const user = await utils.get_profile_data (access_token);
      console.log(user)
      const user_data = user.data;
      let availability = {}
      connection.query("SELECT * FROM user WHERE email='"+user_data.email+"'", function (err, result, fields) {
        if(result.length!=0){
            availability = {
                state : true,
                userType:result[0].user_type,
                userId : result[0].user_id
            }
        }  
        else{
           availability = {
            state : false,
        }
        } 
        console.log({availability : availability})
        if(availability.state){
          var sql = "UPDATE user " + "SET login = TRUE WHERE user_id = "+result[0].user_id
        connection.query(sql, function (err, result2, fields) {
          if(err){

          }
          else{
            const token = generate_token(result[0].user_id , result[0].user_type,result[0].email)
            res.redirect('http://localhost:3000/home/'+token+"/"+result[0].user_type)
          }
        })
        }
        else{
            res.redirect('http://localhost:3000/sign/'+user_data.email)
        }
        console.log (user_data);
      })
    } catch (error) {
      console.log (error.message);
      res.sendStatus (500);
    }
  });

app.listen(process.env.PORT,()=>{
    console.log('server started in port : ',process.env.PORT)
})
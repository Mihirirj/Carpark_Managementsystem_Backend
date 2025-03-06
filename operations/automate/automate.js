const cron = require("node-cron");
var connection = require('../../service/connection')
const nodemailer = require("nodemailer");

function format (date) {  
    if (!(date instanceof Date)){
      throw new Error('Invalid "date" argument. You must pass a date instance')
    }
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return `${time}`
  }

cron.schedule("*/600 * * * * *", function () {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "<your-email>@gmail.com",
    // use generated app password for gmail
          pass: "***********",
        },
      });
    connection.query("SELECT * FROM booking WHERE reservation=TRUE AND enter = TRUE", function (err, result, fields) {
        if (err) {
            res.send(err)
            return
        };
        var current_time = format(new Date)
        for (let i=0; i<result.length; i++){
            if(current_time>result.end_time){
                connection.query("SELECT email FROM user WHERE user_id= "+result.user_id, function (err, result2, fields) {
                    if (err) {
                    }
                    else{
                        let mailDetails = {
                            from: "<your-email>@gmail.com",
                            to: "<user-email>@gmail.com",
                            subject: "TiME EXCEEDING",
                            text: "Now start extra payment calculation",
                          };
                          mailTransporter.sendMail(mailDetails, function (err, data) {
                            if (err) {
                              console.log("error occurred", err.message);
                            } else {
                              console.log("---------------------");
                              console.log("email sent successfully");
                            }
                          });
                    }      
                })
            }     
    }
      });
      connection.query("SELECT * FROM booking WHERE reservation=TRUE AND enter = FALSE", function (err, result, fields) {
        if (err) {
            res.send(err)
            return
        };
        var current_time = format(new Date)
        for (let i=0; i<result.length; i++){
            if(current_time>result.end_time){
                var sql = "UPDATE slot " + "SET availability = TRUE WHERE slot_id = "+result.slot_id
                connection.query(sql, function (err, result2, fields) {
                    if (err) {
                        res.send(err)
                        return
                    }
                })
                connection.query("SELECT email FROM user WHERE user_id= "+result.user_id, function (err, result2, fields) {
                    if (err) {
                    }
                    else{
                        let mailDetails = {
                            from: "<your-email>@gmail.com",
                            to: "<user-email>@gmail.com",
                            subject: "TiME EXCEEDING",
                            text: "Now Your Reservation Is Over",
                          };
                          mailTransporter.sendMail(mailDetails, function (err, data) {
                            if (err) {
                              console.log("error occurred", err.message);
                            } else {
                              console.log("---------------------");
                              console.log("email sent successfully");
                            }
                          });
                    }      
                })
            }     
    }
      });
    console.log("---------------------");
    console.log("running a task every 15 seconds");
  });
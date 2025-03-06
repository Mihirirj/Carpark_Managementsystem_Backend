var connection = require("../service/connection");

connection.query(
  "CREATE TABLE booking (booking_id INT AUTO_INCREMENT PRIMARY KEY,  date VARCHAR(255),start_time VARCHAR(255), end_time VARCHAR(255), duration INT , vehicle_no VARCHAR(255) ,user_id INT , slot_id INT , park_id INT, reservation BOOLEAN, enter BOOLEAN)",
  function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  }
);

connection.query(
  "CREATE TABLE feedback (feedback_id INT AUTO_INCREMENT PRIMARY KEY,park_id INT ,feedback VARCHAR(255) ,user_id INT)",
  function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  }
);

connection.query(
  "CREATE TABLE slot (slot_id INT AUTO_INCREMENT PRIMARY KEY , availability BOOLEAN , park_id INT)",
  function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  }
);

connection.query(
  "CREATE TABLE carpark (park_id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), longitude VARCHAR(255), latitude VARCHAR(255),url VARCHAR(255) , rate DOUBLE , rate_amount INT, owner_id INT , price INT , spot_size VARCHAR(255) , special_note VARCHAR(255), facilities VARCHAR(255),admin_status VARCHAR(255))",
  function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  }
);

connection.query(
  "CREATE TABLE user (user_id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) , user_type VARCHAR(255) , login BOOLEAN)",
  function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  }
);

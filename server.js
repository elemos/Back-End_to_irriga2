const express = require("express");
const app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'J@dif132',
  database: 'IRRIGA'
});

connection.connect()

connection.query('SELECT * FROM cities ', function (err, rows, fields) {
  if (err) throw err
    console.log("aqui")
    console.log(rows.length)
    
    for (i = 0; i<rows.length; i ++){
        console.log('The solution is: ', rows[i].name);
    }
    console.log("aqui2")
});

connection.end();


app.listen(3000, () => {
           console.log("Server start");
           })
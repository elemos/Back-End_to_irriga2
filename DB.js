var mysql = require('mysql');
var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'J@dif132',
        database: 'IRRIGA'
    });

connection.connect(error => {
        if (error) throw error;
        console.log("Successfully connected to the database.");
    });

module.exports = connection;

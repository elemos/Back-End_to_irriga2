//Contem as credenciais do banco
//E efetiva a conexão e retornar um listener para a aplicação usar

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

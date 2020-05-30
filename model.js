var sql = require('./DB.js');
var result;

async function soma(){
    return 5 + 5;
}
//'SELECT' + consulta + 'FROM' + tabela
async function select(consulta, tabela){
    return new Promise(async function(resolve, reject){
        try{
            
             await sql.query('SELECT * FROM cities', function(err, rows, fields){
                 resolve(rows[0]);
             });
             console.log(this.consulta);
            console.log(this.tabela);
                console.log ("executado");
               
        } catch (err) {

          console.log('Error occurred', err);

          reject(err);
            
        }
    });
   
}

function Alter(consulta){
    sql.query('SELECT * FROM cities ', function (err, rows, fields) {
      if (err) throw err
        console.log("aqui")
        console.log(rows.length)

        for (i = 0; i<rows.length; i ++){
            console.log('The solution is: ', rows[i].name);
        }
        console.log("aqui2")
    });
}

function Insert(rows, values){
    sql.query('INSERT * VALUES  ', function (err, rows, fields) {
      if (err) throw err
        console.log("aqui")
        console.log(rows.length)

        for (i = 0; i<rows.length; i ++){
            console.log('The solution is: ', rows[i].name);
        }
        console.log("aqui2")
    });
}

function Delete(consulta){
    sql.query('DELETE * FROM cities ', function (err, rows, fields) {
      if (err) throw err
        console.log("aqui")
        console.log(rows.length)

        for (i = 0; i<rows.length; i ++){
            console.log('The solution is: ', rows[i].name);
        }
        console.log("aqui2")
    });
}

module.exports.select = select;
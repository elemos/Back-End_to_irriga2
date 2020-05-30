var sql = require('./DB.js');
var result;

/*
async function consistir(consulta, tabela){
    this.consulta = consulta;
    this.tabela = tabela;
}4*/
async function select(consulta, tabela){
    
    return new Promise(async function(resolve,reject){
        try{
             
              sql.query(('SELECT ' + consulta + ' FROM ' + tabela), function(err, rows, fields){
                 resolve(rows);
             });
             
                console.log ("executado");
               
        } catch (err) {

          console.log('Error occurred', err);

          reject(rows);
            
        }
    });
}

function update(tabela, arguments, condition){
    
    return new Promise(async function(resolve,reject){
        try{
             
             sql.query('UPDATE ' + tabela + ' SET ' + arguments + ' WHERE ' +condition, function (err, rows, fields){
                 resolve(rows);
             });
             
               
        } catch (err) {

          console.log('Error occurred', err);

          reject(rows);
            
        }
    });
}

function Insert(tabela, columns, values){
    
    return new Promise(async function(resolve,reject){
        try{
             
             sql.query('INSERT INTO ' + tabela + ' ' + columns + ' VALUES ' +values, function (err, rows, fields){
                 resolve(rows);
             });
     
        } catch (err) {

          console.log('Error occurred', err);

          reject(rows);
            
        }
    });
}

function Delete(tabela, condition){
    return new Promise(async function(resolve,reject){
        try{
             
             sql.query('DELETE FROM ' + tabela + ' WHERE ' +condition, function (err, rows, fields){
                 resolve(rows);
             });
     
        } catch (err) {

          console.log('Error occurred', err);

          reject(rows);
            
        }
    });
}

module.exports.select = select;
module.exports.update = update;
module.exports.insert = Insert;
module.exports.delete = Delete;
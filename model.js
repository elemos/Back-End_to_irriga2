var sql = require('./DB.js');
var result;

/*
**
** COMANDOS ADICIONAIS COMO JOINS, GROUP BY OU ORDER BY PODEM SER
** ADICIONADOS AS STRING FINAIS DA QUERY, EXENPLO, NA FUNÇÃO SELECT A VARIAVEL CONDITTION
** PODE TRAZER AGREGADA A FUNÇÃO ORDER BY
**
*/

//Função para fazer a seleção dentro do banco de dados
//Variavel consulta recebe qual campo deve ser selecionado, 
//variavel tabela contem a tabela da busca
//Variael condition contém as condições do WHERE, caso não queira utilizar o where a variavel deve conter um string vazia "";
async function select(consulta, tabela, condition){
    
    return new Promise(async function(resolve,reject){
        try{
                if(! (condition == "" || condition == " ")){
                    con = 'SELECT ' + consulta + ' FROM ' + tabela + ' WHERE ' + condition;
                } else con = 'SELECT ' + consulta + ' FROM ' + tabela;
            
                sql.query((con), function(err, rows, fields){
                 resolve(rows);
             });
             
                console.log ("executado");
               
        } catch (err) {

          console.log('Error occurred', err);

          reject(rows);
            
        }
    });
}

//Função para fazer o update dentro do banco de dados
//Variavel arguments recebe quais os campos e valores a serem atualizados, 
//variavel tabela contem a tabela da busca
//Variael condition contém as condições do WHERE, caso não queira utilizar o where a variavel deve conter um string vazia "";
async function update(tabela, arguments, condition){
    
    return new Promise(async function(resolve,reject){
        try{
             
            if(! (condition == "" || condition == " ")){
                    con = 'UPDATE ' + tabela + ' SET ' + arguments + ' WHERE ' +condition;
                } else con = 'UPDATE ' + tabela + ' SET ' + arguments;
            
             sql.query(con, function (err, rows, fields){
                 resolve(rows);
             });
             
               
        } catch (err) {

          console.log('Error occurred', err);

          reject(rows);
            
        }
    });
}

//Função para fazer a inserção dentro do banco de dados
//Variavel columns contém as colunas a receberem os dados, se utilizar "" as colunas serão default da tabela 
//variavel tabela contem a tabela da busca
//Variavel values contem os valores a serem inseridos

async function Insert(tabela, columns, values){
    
    return new Promise(async function(resolve,reject){
        try{
             console.log("dentro da função insert");
            console.log('INSERT INTO ' + tabela + ' ' + columns + ' VALUES ' +values);
             sql.query('INSERT INTO ' + tabela + ' ' + columns + ' VALUES ' +values, function (err, rows, fields){
                 resolve(rows);
             });
     
        } catch (err) {

          console.log('Error occurred', err);

          reject(rows);
            
        }
    });
}

//Função para fazer o delete dentro do banco de dados
//variavel tabela contem a tabela da busca
//Variael condition contém as condições do WHERE, caso não queira utilizar o where a variavel deve conter um string vazia "";
async function Delete(tabela, condition){
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

//Função usada para ações no banco ais especificas que não se enquadrão na versões anteriores
async function genericsql(query){
    return new Promise(async function(resolve,reject){
        try{
             
             sql.query(querry, function (err, rows, fields){
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
module.exports.Insert = Insert;
module.exports.delete = Delete;
module.exports.genericsql = genericsql;
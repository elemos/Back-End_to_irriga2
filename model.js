var sql = require('./DB.js');
var result;

/*
**
** COMANDOS ADICIONAIS COMO JOINS, GROUP BY OU ORDER BY PODEM SER
** ADICIONADOS AS STRING FINAIS DA QUERY, EXENPLO, NA FUNÇÃO SELECT A VARIAVEL CONDITTION
** PODE TRAZER AGREGADA A FUNÇÃO ORDER BY
** OU pode ser usada a funçao genericsql
*/

//Função para fazer a seleção dentro do banco de dados
//@param: consulta recebe qual campo deve ser selecionado (id, name, lat, long, etc), 
//@param: tabela contem a tabela da busca (cities, cities_weather)
//@param: condition contém as condições do WHERE, caso não queira utilizar o where a variavel deve conter um string vazia "";
async function select(consulta, tabela, condition){
    
    return new Promise(async function(resolve,reject){
        try{
            //Se parametros do where NÃO vázios a consulta é feita COM o WHERE caso contrário sem ele  
            if(! (condition == "" || condition == " ")){
                 con = 'SELECT ' + consulta + ' FROM ' + tabela + ' WHERE ' + condition;
            } else con = 'SELECT ' + consulta + ' FROM ' + tabela;
            
            //Printa na tela a string de consulta
            console.log(con);
            
            //Faz a consulta efetivamente
            sql.query((con), function(err, rows, fields){
            
            //Resolve a consulta e retornar
            resolve(rows);
                
        });
        //Caso a consulta retorne erro ele é mostrado na tela
        } catch (err) {

          console.log('Um erro ocorreu ao selecionar: ', err);
        
          reject(rows);
            
        }
    });
}

//Função para fazer o update dentro do banco de dados
//@param arguments recebe quais os campos e valores a serem atualizados, 
//@param tabela contem a tabela da busca
//@param condition contém as condições do WHERE, caso o where venha vazio avisa o usuário; 

async function update(tabela, arguments, condition){
    
    return new Promise(async function(resolve,reject){
        try{
            //Se parametros do where NÃO vázios a consulta é feita COM o WHERE caso contrário o usuário é avisado
            if(! (condition == "" || condition == " ")){
                    con = 'UPDATE ' + tabela + ' SET ' + arguments + ' WHERE ' +condition;
                } else {
                    console.log("WHERE dentro do upate está faltando");
                    break;
                }
                //Printa na tela a string de consulta
                console.log(con);
                //Faz a consulta 
                sql.query(con, function (err, rows, fields){
                    
                resolve(rows);
             });
             
               
        } catch (err) {
            //Reporta o erro na tela
          console.log('Um erro ocorreu ao fazer o update: ', err);

          reject(rows);
            
        }
    });
}

//Função para fazer a inserção dentro do banco de dados
//@param columns contem as colunas a receberem os dados, se utilizar "" as colunas serão default da tabela 
//@param tabela contem a tabela da busca
//@param values contem os valores a serem inseridos

async function Insert(tabela, columns, values){
    
    return new Promise(async function(resolve,reject){
        try{
             //Printa na tela a string de busca
             console.log('INSERT INTO ' + tabela + ' ' + columns + ' VALUES ' +values);
             //Executa o Insert
             sql.query('INSERT INTO ' + tabela + ' ' + columns + ' VALUES ' +values, function (err, rows, fields){
                 //Resolve o Promise
                 resolve(rows);
             });
     
        } catch (err) {
            //Mostra o erro na tela
          console.log('Um erro ocorreu ao inserir: ', err);

          reject(rows);
            
        }
    });
}

//Função para fazer o delete dentro do banco de dados
//@param tabela contem a tabela da busca
//@param condition contém as condições do WHERE;
async function Delete(tabela, condition){
    return new Promise(async function(resolve,reject){
        try{
            //Checa se os parametros do WHERE não são nulos ou vazios, se forem avisa o usuário
            if(! (condition == "" || condition == " ")){
                //Imprime na tela a string de busca
                console.log('DELETE FROM ' + tabela + ' WHERE ' +condition);
                //Executa o delete
                sql.query('DELETE FROM ' + tabela + ' WHERE ' +condition, function (err, rows, fields){
                //Resolve a Promise 
                resolve(rows);
             });
            }
            //Printa o aviso que está sem o WHERE
            else console.log("Ação de delete está sem o WHERE, tomar cuidado")
            
        } catch (err) {
            //Printa na tela o erro
          console.log('Um erro ocorreu ao deletar', err);

          reject(rows);
            
        }
    });
}

//Função usada para ações no banco ais especificas que não se enquadrão na versões anteriores
async function genericsql(query){
    return new Promise(async function(resolve,reject){
        try{
            //Printa a string de busca
            console.log(query);
            //Executa a ação no banco
            sql.query(querry, function (err, rows, fields){
                //Resolve a Promise
                 resolve(rows);
            });
     
        } catch (err) {
            //Printa o erro
            console.log('Um erro ocorreu ao fazer a ação no banco: ', err);

            reject(rows);
        }
    });
}

module.exports.select = select;
module.exports.update = update;
module.exports.Insert = Insert;
module.exports.delete = Delete;
module.exports.genericsql = genericsql;
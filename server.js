/*Constantes necessárias para o projeto
/*Declaraçao de outros arquivos
*/
const express = require("express");
const app = express();
const model = require('./model.js');
const axios = require('axios');
const cron = require('node-cron');
const readline = require ('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


/*Variaveis globais usadas*/
/**************************/
var cidade;
var ApiWeather = [];
var WeatherInfo = {};
var citieWeather = [];

//Função que organiza as informações de busca no banco de dados
//@param id: ID da cidade a ser procurada, caso esteja vazia buscará em todas cidade
async function buscacidades(id){
    console.log("************************\n" +
                "Buscando a(s) cidade(s)");
    if(id > 0){
        //chama o select passando o id como parametro do where
        let cities = await model.select("*", "cities", "id = "+id);
        //Se o retorno foi vázio significa que a consulta no sql não achu a cidade
        if(cities == ""){
            console.log("\n*******************************************")
            console.log("Cidade não encontrada, verificar ID passado");
        }
        this.cidade = cities;
        
    }
    else {
        //chama o select sem parametro do where
        let cities = await model.select("*", "cities", "");
        this.cidade = cities;
        
    }
    
    console.log(this.cidade);
    
}


//Função para buscar as informações de clima da API e salvar elas na tabela local
async function buscaclima(){

    //Irá eecutar a busca na API e insert no banco para todas as cidades buscadas anteriormente
    for(var i = 0; i<this.cidade.length;i++){
        
        //Se a latitude ou longitude forem nulas, quebra o loop e vai pra próxima
        if((this.cidade[i].latitude == null) || (this.cidade[i].longitude == null)){
            console.log("\n*******************************")
            console.log("Latitude e Longitude da cidade:" +
                        "\n ID: " + this.cidade[i].id +
                        "\n Nome: " + this.cidade[i].name +
                        "\n não informadas");
            break;
        }
        //buscando o json
        console.log("\n**************************\n" +
                    "Acessando a API do clima");
        
        await axios.get('http://api.openweathermap.org/data/2.5/weather?' +
                        'lat=' + this.cidade[i].latitude + '&' +
                        'lon=' + this.cidade[i].longitude + '&' +
                        'appid=9b12c926e2e3d6b81482cf88efc3f15a&' +
                        'units=metric').then(
            (response) => {
                //Imprime na tela o json obtido
                console.log(response.data);
                
                //Recalcula os segundos das datas baseado no gmt das cidade.
                //Se o GMT for positivo ele soma ao tempo recebido da API, se for negativo diminui 
                if (this.cidade[i].gmt > 0 ){
                    console.log("entrei aqui");
                    var sunrise = response.data.sys.sunrise + (Math.abs(this.cidade[i].gmt * 3600));
                    var sunset = response.data.sys.sunset + (Math.abs(this.cidade[i].gmt * 3600));
                    var dt = response.data.sys.dt + (Math.abs(this.cidade[i].gmt * 3600));
                }
                else{
                    console.log("não, entrei aqui")
                    var sunrise = response.data.sys.sunrise - (Math.abs(this.cidade[i].gmt * 3600));
                    var sunset = response.data.sys.sunset - (Math.abs(this.cidade[i].gmt * 3600));
                    var dt = response.data.dt - (Math.abs(this.cidade[i].gmt * 3600));
                }
                
                //Seta os valores a serem inseridos no banco.
                valores ='( 0,' +                           //0 pois o ID é autoincrement
                    this.cidade[i].id + ',' + 
                    response.data.main.temp + ',' + 
                    response.data.main.temp_max + ',' +                                    
                    response.data.main.temp_min + ',' + 
                    response.data.wind.speed + ',' + 
                    sunrise + ',' +                         //Salva em segundos                               
                    sunset + ',' +                          //Salva em segundos
                    0 + ',' +                               //Campos da quantidade de chuva que não está presenta no json
                    dt + ')';                               //TimeStamp em segundos

                
                //Chama a função de insert no banco passando a tabela, colunas e valores
                console.log("***************************\n" +
                            "Salvando o clima no Banco");
                model.Insert("citie_wheather", "", valores);

            },
            (error) => {
                console.log(error);
        });
    }
    
}

//Função que chama as rotinas princpais.
async function rotina(id){
        
    await    buscacidades(id);
    
    await    buscaclima();
}


//Função que cria e controla a execução automatica das rotinas a cada hora no minuto 30
function schedule(){
    
    cron.schedule('30 */1 * * *', () => {
        console.log('**************************\n' +
                    'Rodando a busca Automatica');
        rotina();
    });
}

//Função de start do sistema e que ouvi o cmd
async function start(){
    
    //chama função de automação
    schedule();
    
    //Laço que fica escutando a entrada do usuário no cmd, ou seja, os comandos manuais.
    for await (const comando of rl) {
        //Pega o comando inserido e quebra no espaço para dividir os parametros
        var Scomando = comando.split(" ");
        //Checa se o primiro parametro é um comando válido
        if(Scomando[0] == "buscar"){
            //verifica parametros adicionais,ou seja, o ID da cidade, caso não tenha chama a rotina para todas cidades
            if(Scomando[1] == undefined){
                rotina();
                
            } 
            //Verifica se o parametro de ID é um ID válido e chama a rotina com o ID
            else if(Scomando[1] > 0){
                rotina(Scomando[1]);
            }
            //Caso o ID sejá invalido avisa o usuário
            else {
                console.log("\n ID da cidade deve ser maior que 0");
            }
        }
    }
    //feça o listener do prompt
    rl.close();
    
}

app.listen(3000, () => {
            console.log("SERVER START \n \n");
            start();
           })


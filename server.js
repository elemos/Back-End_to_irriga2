const express = require("express");
const app = express();
const model = require('./model.js');

var cidades;
async function buscacidades(){
    
    let teste = await model.select("*", "cities", "");
    console.log(teste);
    this.cidade = teste;
    
}




async function start(){
    
    await buscacidades();
    console.log(this.cidade);

}

start();



/*app.listen(3000, () => {
           console.log("Server start");
            start();
           })
*/

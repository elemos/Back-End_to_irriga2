const express = require("express");
const app = express();
const model = require('./model.js');

async function buscacidades(){
    let teste = await model.select("*", "cities");
}




async function start(){
    
    
    let teste = await model.select();

    console.log("antes da chamada");
    
    console.log(teste);
    
    console.log("depois da chamada");
}

start();



/*app.listen(3000, () => {
           console.log("Server start");
            start();
           })
*/

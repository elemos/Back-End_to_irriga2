const express = require("express");
const app = express();
const model = require('./model.js');
const axios = require('axios');


var cidade;
var ApiWeather = [];
var WeatherInfo = {};
var citieWeather = [];

async function buscacidades(){
    
    let cities = await model.select("*", "cities", "");
    this.cidade = cities;
    
}

async function buscaclima(){

    for(var i = 0; i<this.cidade.length-1;i++){
        
        
        //buscando o json
        await axios.get('http://api.openweathermap.org/data/2.5/weather?' +
                        'lat=' + this.cidade[i].latitude + '&' +
                        'lon=' + this.cidade[i].longitude + '&' +
                        'appid=9b12c926e2e3d6b81482cf88efc3f15a&' +
                        'units=metric').then(
            (response) => {
   
                valores = '( 0,' + this.cidade[i].id + ',' + response.data.main.temp + ',' + response.data.main.temp_max + ',' +                               response.data.main.temp_min + ',' + response.data.wind.speed + ',' + response.data.sys.sunrise + ',' +                                   response.data.sys.sunset + ',' + 0 + ',' + response.data.dt + ')';

                model.Insert("citie_wheather", "", valores);

               
                
            },
            (error) => {
                console.log(error);
        });
    }
    
}

async function criaobjeto(){
    
}


async function start(){
    await buscacidades();
    
    await buscaclima();
    
    //await criaobjeto();
    
    //await SalvaClima();

}

//start();



app.listen(8080, () => {
           console.log("Server start");
            start();
           })


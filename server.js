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
    //Iniciando as variaveis
    this.citieWeather = [];
    this.WeatherInfo = {
        id_citie:   "",
        temp:       "",
        temp_max:   "",
        temp_min:   "",
        wind_speed: "",
        sunrise:    "",
        sunset:     "",
        rain:       "",
        time_stamp: "",
    };
    
    for(var i = 0; i<this.cidade.length-1;i++){
        
        
        //buscando o json
        await axios.get('http://api.openweathermap.org/data/2.5/weather?' +
                        'lat=' + this.cidade[i].latitude + '&' +
                        'lon=' + this.cidade[i].longitude + '&' +
                        'appid=9b12c926e2e3d6b81482cf88efc3f15a&' +
                        'units=metric').then(
            (response) => {

                //savando o Json em um objeto
                this.WeatherInfo.id_citie   = this.cidade[i].id;
                this.WeatherInfo.temp       = response.data.main.temp; 
                this.WeatherInfo.temp_max   = response.data.main.temp_max; 
                this.WeatherInfo.temp_min   = response.data.main.temp_min; 
                this.WeatherInfo.wind_speed = response.data.wind.speed; 
                this.WeatherInfo.sunrise    = response.data.sys.sunrise; 
                this.WeatherInfo.sunset     = response.data.sys.sunset; 
                this.WeatherInfo.rain       = '0';
                this.WeatherInfo.time_stamp = response.data.dt; 

                //carregando o objeto pra um array list
                this.citieWeather[i] = (this.WeatherInfo);
                
        valores = '( 0,' + this.citieWeather[i].id_citie + ',' + this.citieWeather[i].temp + ',' + this.citieWeather[i].temp_max + ',' +                                    this.citieWeather[i].temp_min + ',' + this.citieWeather[i].wind_speed + ',' + this.citieWeather[i].sunrise + ',' +                                this.citieWeather[i].sunset + ',' + this.citieWeather[i].rain + ',' + this.citieWeather[i].time_stamp + ')';
         model.Insert("citie_wheather", "", valores);
                
                console.log(this.citieWeather[i]);
                
            },
            (error) => {
                console.log(error);
        });
    }
    //const api_url = `https://api.darksky.net/forecast/${APIKEY}/${req.body.lat},${req.body.lon}?units=auto` //busca JSON na API
      
}

async function criaobjeto(){
    
}
async function SalvaClima(){
    for(var i = 0; i<this.citieWeather.length; i++){
        
        valores = '( 0,' + this.citieWeather[i].id_citie + ',' + this.citieWeather[i].temp + ',' + this.citieWeather[i].temp_max + ',' +                                    this.citieWeather[i].temp_min + ',' + this.citieWeather[i].wind_speed + ',' + this.citieWeather[i].sunrise + ',' +                                this.citieWeather[i].sunset + ',' + this.citieWeather[i].rain + ',' + this.citieWeather[i].time_stamp + ')';
        await model.Insert("citie_wheather", "", valores);   
        
        console.log(i);
        console.log(this.citieWeather[i]);
        console.log(valores);
       
    }
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


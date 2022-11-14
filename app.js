const express = require('express');
const axios = require('axios');
const https = require("https");
const { restart } = require('nodemon');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', async (req, res) => { // Con async le deciamos a la funcion que es una funcion asincronica, esto quiere decir
  res.sendFile(__dirname + "/index.html")
})

app.post('/', async (req,res) =>{
    console.log(req.body.cityName)

    // que cuando se encuentre con una funcion con await antes! se dentendra todo y espeara a que dicha funcion entrege lo que 
    // tenga que entregar

    //Inico y todo !!
    
    const apiKey = "5900311ebb98b8c440db62e9bdb89df9"
    const units = "metric"
    const city = req.body.cityName

    const urlLatitude = "https://api.openweathermap.org/geo/1.0/direct?appid=" + apiKey + "&limit=5&q=" + city
    // esta parte de la funcion quedara pegada por asi decirlo, hasta que llegue
    const getLatitude = await axios.get(urlLatitude) 
    // la informacion solicitada!

    //recojemos los datos que queremos
    const lat1 = getLatitude.data[0].lat 
    const lon1 = getLatitude.data[0].lon
    // const { lat, lon } = getLatitude.data[0] <- lo mismo que lo de arriba pero mas lindiwi :3

    // Aca creamos el url con los datos que solicitamos anteriormente
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat1 + "&lon=" + lon1 + "&appid=" + apiKey + "&units=" + units
    // y ahora solicitamos los datos del tiempo! :D nuevamente con un await antes para que espere la respuesta antes de enviarla
    // como resultado del api rest
    const getWeather = await axios.get(url)

    // Datitos que quiero
    const temp = getWeather.data.main.temp
    const description = getWeather.data.weather[0].description
    const icon = getWeather.data.weather[0].icon
    const imageURL = ("http://openweathermap.org/img/wn/"+icon+"@2x.png")


    res.write("<p>The city of " +city+ " is currently " + description + "</p>")
    res.write( "<h1>The tempeture in "+ city + " is " + temp + " degrees Celcius</h1>")
    res.write("<img src=" + imageURL + ">")

    res.send()

    console.log(temp)
    console.log(description)

    
    
})

app.listen(3001, function() {
    console.log("http://localhost:3001/demo")
    console.log("Server is running on port 3001")
})
const express = require('express');
const https = require("https");
const { restart } = require('nodemon');

const app = express();

app.get("/", function(req, res){

    const query = "London";
    const apiKey = "5900311ebb98b8c440db62e9bdb89df9"
    const units = "metric"
    const city = "Aarhus"
     
    const urlLatitude = "https://api.openweathermap.org/geo/1.0/direct?appid=" + apiKey + "&limit=5&q=" + city
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat1 + "&lon=" + lon1 + "&appid=" + apiKey + "&units=" + units

    https.get(urlLatitude, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
          const weatherData  = JSON.parse(data)
        
          let lat1 = weatherData[0].lat
          let lon1 = weatherData[0].lon

        })
    })

    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = ("http://openweathermap.org/img/wn/"+icon+"@2x.png")

            res.write("<p>The city of Aarhus is currently " + description + "</p>")
            res.write( "<h1>The tempeture in Aarhus is " + temp + " degrees Celcius</h1>")
            res.write("<img src=" + imageURL + ">")
            
            res.send();

            console.log(temp);
            console.log(description);
        })
    })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000")
})
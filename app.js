//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
   const city= req.body.cityName;
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=6647d523052614b5d50cdb7a76f453b2&units=metric";

    https.get(url, function(response){
       console.log(response.statusCode);

       response.on("data", function(data){
          const weatherData =JSON.parse(data);
          const temp = weatherData.main.temp;
          console.log(weatherData);
          const weatherDescription = weatherData.weather[0].description;
          const iconid = weatherData.weather[0].icon;
          const imageurl = "https://openweathermap.org/img/wn/"+iconid+"@2x.png";
          res.write("<h1>The weather in "+ city +" is "+ temp + " degree Celcius.</h1>");
          res.write("<h1> The weather is currently "+ weatherDescription );
          res.write("<img src="+imageurl+">");
          res.send();
       });

     });

});

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});

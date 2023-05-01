const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
const ejs = require("ejs");
const app = express();
const apiKey = require(__dirname+"/config.js");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){

    Key = apiKey.MY_KEY;
    const query = req.body.cityName;
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&APPID="+ Key +"&units="+ unit +""; 
    //weather api
    
    https.get(url,function(response){

        //console.log(response.statusCode);

        response.on('data',function(data){     //   data that comes is in hexaDecimal format
            const weatherData = JSON.parse(data);  //hexaDecimal data is converted in to the JASON format.
            const weatherTemperature = weatherData.main.temp; 
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";
            //console.log("temperature is: "+weatherTemp);
            //console.log("Description: "+weatherDescription);
           // console.log("Description: "+weatherIcon);

           res.render("temperature",{      //   displaying response using ejs
            weatherDes : weatherDescription,
            weatherTemp : weatherTemperature,
            weatherImg : imageURL,
            location : query,
           });


           // simply displaying data using res.write method.

           // res.write("<p>The weather is currently "+ weatherDescription +"</p>")
            //res.write("<h1>The temperture in "+ query +" is "+ weatherTemperature +" degree Celcius</h1>");
            //res.write("<img src = "+ imageURL +" >");
            
            //res.send();  //we can have only one res.send() so we use res.write(), it can be used multiple times 

        })
    })


})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
const express= require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
  const query= req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=7a5887c2e709d37e01e2bcfefab2572c&units=metric";
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      res.write("<h1>The temparature of "+query+ " is "+temp+" degree calcius.</h1>");
      res.write("<h3>The weather is currently "+weatherDescription+".</h3>");
      res.write("<img src= http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png>");
      res.send();
})
})
}) ;


app.listen(3000,function(){
  console.log("Server started at Port 3000");
});

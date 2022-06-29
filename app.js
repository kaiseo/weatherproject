const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {

    const query = req.body.cityName
    console.log(query);
    const apiKey = "b40a4630125165aaccbd45276302d331"
    const metric = 'metric'
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + metric;

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in "+query+" is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});


app.listen(port, function () {
    console.log("Server is running on port 3000");
});
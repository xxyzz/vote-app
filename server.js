var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/signup", function (request, response) {
  response.sendFile(__dirname + '/views/signup.html');
});

app.get("/login", function (request, response) {
  response.sendFile(__dirname + '/views/login.html');
});

app.listen(process.env.PORT);
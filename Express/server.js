//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
  response.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const n1 = Number(req.body.num1);
  const n2 = Number(req.body.num2);
  const result = n1 + n2;
  res.send("The result is " + result);
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});

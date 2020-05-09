const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  const currentDay = new Date().getDay();

  if (currentDay === 0 || currentDay === 6) {
    res.write("<h1>Yay! :D</h1>");
    res.write("It's the weekend!");
    res.write("<p>Don't you love it too?</p>");
  } else {
    res.write("<h1>Boo! :(</h1>");
    res.write("<h2>It's a weekday...</h2>");
    res.write("<p>Kinda sad we don't get to play around :/</p>");
  }

  res.send();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

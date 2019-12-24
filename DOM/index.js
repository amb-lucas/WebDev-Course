
function randomInt(l, r){
  r = r+1-l;
  return Math.floor(l+r*Math.random());
}

var randomNumber1 = randomInt(1, 6);
var randomNumber2 = randomInt(1, 6);
document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");

if(randomNumber1 > randomNumber2)
  document.querySelector("h1").textContent = "🏆 Player 1 Wins";
else if(randomNumber1 < randomNumber2)
  document.querySelector("h1").textContent = "Player 2 Wins 🏆";
else
  document.querySelector("h1").textContent = "It's a Draw";

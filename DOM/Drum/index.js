
document.addEventListener("keydown", function(event) {
  handleButton(event.key);
});

var buttons = document.querySelectorAll(".drum");
for(var i=0; i<buttons.length; i++){
  buttons[i].addEventListener("click", function() {
    handleButton(this.innerText);
  });
}

function handleButton(key){
  key = key.toLowerCase();
  if(key in sound){
    makeSound(key);
    makeAnimation(key);
  }
}

function makeSound(key){
  audio = new Audio(sound[key.toLowerCase()]);
  audio.play();
}

function makeAnimation(key){
  button = document.querySelector("." + key);
  button.classList.add("pressed");
  setTimeout(function() {
    button.classList.remove("pressed");
  }, 100);
}

sound = {
  "w": "sounds/tom1.mp3",
  "a": "sounds/tom2.mp3",
  "s": "sounds/tom3.mp3",
  "d": "sounds/tom4.mp3",
  "j": "sounds/snare.mp3",
  "k": "sounds/crash.mp3",
  "l": "sounds/kick.mp3"
};

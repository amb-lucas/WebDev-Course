
document.addEventListener("keydown", handlePress);

var buttons = document.querySelectorAll(".drum");
for(var i=0; i<buttons.length; i++){
  buttons[i].addEventListener("click", handleClick);
}

function handlePress(event) {
  makeSound(event.key);
}

function handleClick() {
  makeSound(this.innerText);
}

function makeSound(key){
  audio = new Audio(sound[key.toLowerCase()]);
  audio.play();
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

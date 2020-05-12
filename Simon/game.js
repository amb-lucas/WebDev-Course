const buttonColors = ["red", "blue", "green", "yellow"];
const randomNumber = () => Math.floor(4 * Math.random());

let gamePattern = [];
let userAt;

// ANIMATIONS

const playSound = (color) => {
  const audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
};

const animateClick = (color, userClick) => {
  const button = $("#" + color);

  button.fadeOut(100).fadeIn(100);

  if (userClick) {
    button.addClass("pressed");
    setTimeout(() => {
      button.removeClass("pressed");
    }, 100);
  }
};

// GAME LOGIC

const updateTitle = () => {
  $("#level-title").text(`Level ${gamePattern.length}`);
};

const newGame = () => {
  userAt = 0;
  nextSequence();
};

const wrongAnswer = () => {
  $("#level-title").text("Game over. Press any key to try again");
  gamePattern = [];

  const audio = new Audio("./sounds/wrong.mp3");
  audio.play();

  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
};

const SEQUENT_ANIMATIONS_INTERVAL = 500;

const showSequence = () => {
  gamePattern.forEach((color, i) => {
    setTimeout(() => {
      animateClick(color, false);
      playSound(color);
    }, SEQUENT_ANIMATIONS_INTERVAL * i);
  });

  setTimeout(
    () => (clickAllowed = true),
    SEQUENT_ANIMATIONS_INTERVAL * gamePattern.length
  );
};

const nextSequence = () => {
  userAt = 0;
  clickAllowed = false;

  const randomColor = buttonColors[randomNumber()];
  gamePattern.push(randomColor);

  updateTitle();

  showSequence();
};

// USER INTERACTION

let clickAllowed = false;
const END_OF_TURN_INTERVAL = 1400;

const handleClick = (color) => {
  if (gamePattern[userAt] !== color) {
    wrongAnswer();
  } else {
    userAt++;
    if (userAt === gamePattern.length) {
      clickAllowed = false;
      setTimeout(nextSequence, END_OF_TURN_INTERVAL);
    }
  }
};

$(".btn").click(function () {
  if (gamePattern.length > 0 && clickAllowed) {
    const usedButton = $(this).attr("id");
    animateClick(usedButton, true);
    playSound(usedButton);
    handleClick(usedButton);
  }
});

$(this).keypress(function () {
  if (gamePattern.length === 0) newGame();
});

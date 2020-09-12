let gameStart = false;
let generatedSequence;
let recordedSequence;
let level;

// Press any key to start
$(document).keydown(function (e) {
  if (!gameStart) {
    console.log("game has started");
    //start of game
    gameStart = true;
    generatedSequence = [];
    recordedSequence = [];
    level = 1;
    $("h1").text(`Level ${level}`);
    generateSeq();
  }
});

// Generate a random seq
function generateSeq() {
  let randomNumber = Math.floor(Math.random() * 4);
  let buttonNumberRelation;

  switch (randomNumber) {
    case 0:
      buttonNumberRelation = ".green";
      audio = new Audio("sounds/green.mp3");
      break;

    case 1:
      buttonNumberRelation = ".red";
      audio = new Audio("sounds/red.mp3");
      break;

    case 2:
      buttonNumberRelation = ".yellow";
      audio = new Audio("sounds/yellow.mp3");
      break;

    case 3:
      buttonNumberRelation = ".blue";
      audio = new Audio("sounds/blue.mp3");
      break;

    default:
      break;
  }

  // Series Created
  generatedSequence.push(buttonNumberRelation);
  animate(generatedSequence[level - 1], audio);
  console.log("generatedSequence = " + generatedSequence);
}

//flash generated seq
function animate(button, audio) {
  if (button != null) {
    $(button).addClass("pressed");
    audio.play();
    setTimeout(() => {
      $(button).removeClass("pressed");
    }, 100);
  } else {
    $("body").addClass("game-over");
    audio.play();
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
  }
}

//Record the seq
$(".btn").click(function () {
  if (gameStart) {
    recordedSequence.push("." + this.id);
    console.log("recordedSeq = " + recordedSequence);

    if (checkSeq(recordedSequence.length)) {
      if (recordedSequence.length == generatedSequence.length) {
        $("h1").text("Correct!");
        setTimeout(() => {
          recordedSequence = [];
          level++;
          $("h1").text(`Level ${level}`);
          generateSeq();
        }, 1000);
      }
    } else {
      animate(null, new Audio("sounds/wrong.mp3"));
      gameStart = false;
      $("h1").text("Game Over! Press any key to start Again");
    }
  }
});

//Check if correct button is pressed
function checkSeq(length) {
  if (recordedSequence[length - 1] === generatedSequence[length - 1]) {
    return true;
  }
  return false;
}

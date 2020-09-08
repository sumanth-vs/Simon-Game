// Recorded Seq has to wait till the whole thing is recorded before returning

let gameStart = 0;

$(document).keydown(function (e) {
  let generatedSequence = [];
  let level = 1;
  let correctAns = true;

  if (gameStart == 0) {
    gameStart = 1;

    while (correctAns) {
      let recordedSeq = [];
      $("h1").text(`Level ${level}`);
      generatedSequence = generateSeq(generatedSequence);

      //Flash the newly generated seq
      $(generatedSequence[level - 1]).addClass("pressed"); // Level - 1 cuz no.of levels = no. of buttons to press
      setTimeout(() => {
        $(generatedSequence[level - 1]).removeClass("pressed");
      }, 100);

      // // Record the Seq
      // recordedSeq = recordSeq(recordedSeq);
      // console.log("recoreded Seq = " + recordedSeq);

      // // If they match, proceed to level 2; else Try again
      // if (checkSeq(generatedSequence, recordedSeq)) {
      //   level++;
      // } else {
      //   $("h1").text("WRONG! Press any Key to Try Again");
      //   correctAns = false;
      //   gameStart = 0;
      // }
    }
  }
});

// Record user sequence
function recordSeq(generatedSequence) {
  let recordedSequence = [];
  $(".btn").click(function () {
    let buttonPressed = "." + this.id;
    recordedSequence.push(buttonPressed);
    console.log("recordedSeq = " + recordedSequence);
  });
  return recordedSequence;
}

// See if recorded seq = generated seq
function checkSeq(generatedSequence, recordedSequence) {
  let res = false;
  for (let i = 0; i < recordedSequence.length; i++) {
    if (recordedSequence[i] === generatedSequence[i]) {
      res = true;
    }
  }
}

// Generate a random seq
function generateSeq(generatedSequence) {
  let randomNumber = Math.floor(Math.random() * 4);
  let buttonNumberRelation;

  switch (randomNumber) {
    case 0:
      buttonNumberRelation = ".green";
      break;

    case 1:
      buttonNumberRelation = ".red";
      break;

    case 2:
      buttonNumberRelation = ".yellow";
      break;

    case 3:
      buttonNumberRelation = ".blue";
      break;

    default:
      break;
  }

  generatedSequence.push(buttonNumberRelation);
  console.log("generatedSequence = " + generatedSequence);

  return generatedSequence;
}

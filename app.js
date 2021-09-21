
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

function nextSequence(){
  userClickedPattern = [];
  var randomNumber =  Math.floor(Math.random()*4)
  var randomChosenColour = buttonColours[randomNumber];
  animation(randomChosenColour);

  // var myAudio = new Audio("sounds/" + randomChosenColour + ".mp3");
  // myAudio.play();
  mySound(randomChosenColour);
  
  
  level++;
  $("#level-title").text("Level "+level);
  
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
 
}

function animation(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(removeShadow,100);
  function removeShadow(){
    $("#"+currentColor).removeClass("pressed");
  }
}

function mySound (currentColor) {
  var mys = new Audio("sounds/"+currentColor+".mp3");
  mys.play();

}


 var started = false; 
$(document).keydown(function (){
  if (!started){
    nextSequence()
    started =true;
  }
} );



  
 

// nextSequence();

$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  mySound(userChosenColour);
  animation(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (gamePattern.length===userClickedPattern.length){
      setTimeout(nextSequence,1000)
    }
    // console.log("success");
  }
  else{
    setTimeout(function (){
      mySound("wrong")
    },200)
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver ();
  }
}

function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
}
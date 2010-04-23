//  Rock Paper Scissors Game for Wiley Book Shop
//  Copyright (c) 2010 Pol Llovet & Chris Jaeger
//  
//  License -> MIT LICENSE: http://en.wikipedia.org/wiki/MIT_License
//  
//  FILE: rockpaperscissors.js
//  This file uses 8 id elements to play rock/paper/scissors 
//  The 5 id's are: #rock, #paper, #scissors, #msg, #result, #win, #lose, #draw
//  - #rock, #paper and #scissors have a click event bound to them to play the game
//  - the result of the game is to show the #win, #lose or #draw in the #result and a #msg
//  - nearly all of the states are managed by adding/removing classes
//  - the "score" is stored in a fake session (it's a hack), and displayed in 
//    #win-score, #lose-score, #draw-score elements.  These are optional. The score does not
//    persist past pageviews.
// 
// This requires jQuery

//// 
// Globals
//
// rps [Array]
//   a convenience array of rock, paper, scissors strings 
// msg [Array]
//   a convenience array of win, lose, draw consequences 
//
// @author Pol Llovet
// 
// @api public
//
var rps = ["rock","paper","scissors"];
var msg = ["win","lose","draw"];

//// 
// Initialize the game when the document is ready
// 
// @author Pol Llovet
// 
// @api public
// 
$(document).ready(function() {
  //TODO: There has to be a better way to do this
  $("#"+rps[0]).click(function(){ play(rps[0]); });
  $("#"+rps[1]).click(function(){ play(rps[1]); });
  $("#"+rps[2]).click(function(){ play(rps[2]); });
  
  bodyWidth = $('body').width();
  $('#play-button').click(slidePlay);
  
  //Check and init session vars
  if($.session("win") == undefined){
    $.session("win", 1);
  };
  if($.session("lose") == undefined){
    $.session("lose", 1);
  };
  if($.session("draw") == undefined){
    $.session("draw", 1);
  };
  
  updateScore();
  
});

//// 
// Open the sliding game, and reset the button to slide the game closed if clicked
// Assign this behavior to an anonymous function so it can be passed
//
// @author Pol Llovet
// 
// @api public
//
slidePlay = function(){
  $('#slide-game').animate({
    left: '+=' + bodyWidth,
  }, 1000, function() {
    $('#play-button').text('D O N E');
    $('#play-button').unbind('click');
    $('#play-button').click(unslidePlay);
  });
}

//// 
// Close the sliding game, and reset the button to slide the game open if clicked
// Assign this behavior to an anonymous function so it can be passed
//
// @author Pol Llovet
// 
// @api public
//
unslidePlay = function(){
  $('#slide-game').animate({
    left: '-=' + bodyWidth,
  }, 1000, function() {
    $('#play-button').text('P L A Y');
    $('#play-button').unbind('click');
    resetButtons();
    $('#play-button').click(slidePlay);
  });
}

//// 
// The main function that contains the game logic
//
// @param [String] choice
//   a string that matches one of the rps global array values
//
// @author Pol Llovet
// 
// @api public
//
function play(choice){
  var rand = Math.floor(Math.random()*3);
  var result = rps[rand];
  var consequence = "draw";
  var msg = '';
  resetButtons();

  $("#"+choice).addClass("pick");
  $("#"+choice).removeClass("default");
  $("#result").addClass(result);

  //TODO: stupid?
  if(choice == 'rock'){
    if(result == 'paper'){
      consequence = 'lose';      
    }else if (result == 'scissors'){
      consequence = 'win';
    }
  }else if(choice == 'paper'){
    if(result == 'scissors'){
      consequence = 'lose';      
    }else if (result == 'rock'){
      consequence = 'win';
    }
  }else if(choice == 'scissors'){
    if(result == 'rock'){
      consequence = 'lose';      
    }else if (result == 'paper'){
      consequence = 'win';
    }
  }
  $("#result").addClass(consequence);
  
  switch(consequence){
    case 'win':
      msg = "You win, well done.";
      $.session("win",$.session("win")+1);
      $('#win').fadeIn("slow");
      break;
    case 'lose':
      msg = "You lose, try harder.";
      $.session("lose",$.session("lose")+1);
      $('#lose').fadeIn("slow");
      break;
    case 'draw':
      msg = "It's a draw, so close!";
      $.session("draw",$.session("draw")+1);
      $('#draw').fadeIn("slow");
      break;
  }
  $('#front-logo').fadeIn("slow");
  updateScore();
}

//// 
// Reset the buttons of the game to play again, this includes removing the msg and result
//
// @author Pol Llovet
// 
// @api public
//
function resetButtons(){
  for(i in rps){
    $('#'+rps[i]).removeClass('pick').addClass('default');
    $("#result").removeClass(rps[i])
  }
  for(i in msg){
    $('#'+msg[i]).slideUp().fadeOut('slow');
    $("#result").removeClass(msg[i])
  }
}

//// 
// Update the score elements with the session stored values
//
// @author Pol Llovet
// 
// @api public
//
function updateScore(){
  $('#win-score').text($.session('win') - 1);
  $('#lose-score').text($.session('lose') - 1);
  $('#draw-score').text($.session('draw') - 1);
}

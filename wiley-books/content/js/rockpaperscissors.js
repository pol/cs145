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
// This requires jQuery and the jQuery cookie plugin
// This could also use some serious refactoring. :P

//// 
// Globals
//
// rps [Array]
//   a convenience array of rock, paper, scissors strings 
// msg [Array]
//   a convenience array of win, lose, draw consequences 
// score [Hash]
//   a hash to store the score
//
// @author Pol Llovet
// 
var rps = ["rock","paper","scissors"];
var msg = ["win","lose","draw"];
var score = {
  'win':0,
  'lose':0,
  'draw':0
};

//// 
// Initialize the game when the document is ready
// 
// @author Pol Llovet
// 
$(document).ready(function() {
  //TODO: There has to be a better way to do this
  $("#"+rps[0]).click(function(){ play(rps[0]); });
  $("#"+rps[1]).click(function(){ play(rps[1]); });
  $("#"+rps[2]).click(function(){ play(rps[2]); });
  
  bodyWidth = $('body').width();
  $('#playbutton').click(slidePlay);
  $('#playbutton').hover(slidePlayButton, unslidePlayButton);
  
  // Check and init session vars
  // Clear score cookie if getvar is passed
  if($.getUrlVar('clearscore') != undefined){
    $.cookie('win', 0);
    $.cookie('lose', 0);
    $.cookie('draw', 0);
  }else{
    score['win']  = $.cookie('win');
    score['lose'] = $.cookie('lose');
    score['draw'] = $.cookie('draw');
  };
  renderScore();
});

//// 
// Hover-in playbutton animation
// 
// @author Pol Llovet
// 
slidePlayButton = function(){
  $('#playbutton').animate({
    left: '+=40'
  }, 200)
}

//// 
// Hover-out playbutton animation
// 
// @author Pol Llovet
// 
unslidePlayButton = function(){
  $('#playbutton').animate({
    left: '-=40'
  }, 200)
}

//// 
// Open the sliding game, and reset the button to slide the game closed if clicked
// Assign this behavior to an anonymous function so it can be passed
//
// @author Pol Llovet
// 
slidePlay = function(){
  $('#playbutton').unbind('click');
  $('#slide-game').animate({
    left: '+=' + bodyWidth,
  }, 1000, function() {
    $('#playbutton').click(unslidePlay);
  });
}

//// 
// Close the sliding game, and reset the button to slide the game open if clicked
// Assign this behavior to an anonymous function so it can be passed
//
// @author Pol Llovet
// 
unslidePlay = function(){
  $('#playbutton').unbind('click');
  $('#slide-game').animate({
    left: '-=' + bodyWidth,
  }, 1000, function() {
    resetButtons();
    $('#playbutton').click(slidePlay);
  });
}

//// 
// Fade-in animation anonymous functions for message divs
// 
// @author Pol Llovet
// 
win_msg  = function(){$('#win').fadeIn('slow');};
lose_msg = function(){$('#lose').fadeIn('slow');};
draw_msg = function(){$('#draw').fadeIn('slow');};
blank_msg = function(){$('#blank').fadeIn('slow');};


//// 
// The main function that contains the game logic
//
// @param [String] choice
//   a string that matches one of the rps global array values
//
// @author Pol Llovet
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
      score['win']++;
      $('#msg > div:visible').fadeOut('fast', win_msg);
      break;
    case 'lose':
      msg = "You lose, try harder.";
      score['lose']++;
      $('#msg > div:visible').fadeOut('fast', lose_msg);
      break;
    case 'draw':
      msg = "It's a draw, so close!";
      score['draw']++;
      $('#msg > div:visible').fadeOut('fast', draw_msg);
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
function resetButtons(){
  for(i in rps){
    $('#'+rps[i]).removeClass('pick').addClass('default');
    $("#result").removeClass(rps[i])
  }
  for(i in msg){
    $('#msg > div:visible').fadeOut('fast', blank_msg);
  }
}

//// 
// Update the cookie score values with the current values, then render the current values
//
// @author Pol Llovet
// 
function updateScore(){
  $.cookie('win', score['win']);
  $.cookie('lose', score['lose']);
  $.cookie('draw', score['draw']);
  renderScore();
};

//// 
// Update the score elements with the score values
//
// @author Pol Llovet
// 
function renderScore(){
  $('#win-score').text($.cookie('win'));
  $('#lose-score').text($.cookie('lose'));
  $('#draw-score').text($.cookie('draw'));
};
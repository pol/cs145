// This requires jQuery
var rps = ["rock","paper","scissors"];
var msg = ["win","lose","draw"];

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

slidePlay = function(){
  $('#slide-game').animate({
    left: '+=' + bodyWidth,
  }, 1000, function() {
    $('#play-button').text('D O N E');
    $('#play-button').unbind('click');
    $('#play-button').click(unslidePlay);
  });
}

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

function updateScore(){
  $('#win-score').text($.session('win') - 1);
  $('#lose-score').text($.session('lose') - 1);
  $('#draw-score').text($.session('draw') - 1);
}

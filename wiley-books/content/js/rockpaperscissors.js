// This requires jQuery
var rps = ["rock","paper","scissors"];

$(document).ready(function() {
  //TODO: There has to be a better way to do this
  $("#"+rps[0]).click(function(){ play(rps[0]); });
  $("#"+rps[1]).click(function(){ play(rps[1]); });
  $("#"+rps[2]).click(function(){ play(rps[2]); });
  // $("#front-logo").hide()
});

function play(choice){
  var rand = Math.floor(Math.random()*3);
  var result = rps[rand];
  var consequence = "draw";
  var msg = '';

  $("#"+choice).addClass("pick");
  $("#"+choice).removeClass("default");
  $("#result").addClass(result);

  //TODO: stupid?
  if(choice == 'rock'){
    if(result == 'paper'){
      consequence = 'lose';      
    }else if (result == 'scissors'){
      consequence = 'win'
    }
  }else if(choice == 'paper'){
    if(result == 'scissors'){
      consequence = 'lose';      
    }else if (result == 'rock'){
      consequence = 'win'
    }
  }else if(choice == 'scissors'){
    if(result == 'rock'){
      consequence = 'lose';      
    }else if (result == 'paper'){
      consequence = 'win'
    }
  }
  $("#result").addClass(consequence);
  
  switch(consequence){
    case 'win':
      msg = "You win."
      $('#front-logo').show();
      break;
    case 'lose':
      msg = "You lose."
      break;
    case 'draw':
      msg = "It's a tie."
      break;
  }
  $("#msg").text(msg);
}

function resetButtons(){
  for(i in rps){
    $('#'+rps[i]).removeClass('pick').addClass('default');
  }
}

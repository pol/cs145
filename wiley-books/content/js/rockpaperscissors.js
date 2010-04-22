// This requires jQuery
var rps = ["rock","paper","scissors"];
var msg = ["win","lose","draw"];

$(document).ready(function() {
  //TODO: There has to be a better way to do this
  $("#"+rps[0]).click(function(){ play(rps[0]); });
  $("#"+rps[1]).click(function(){ play(rps[1]); });
  $("#"+rps[2]).click(function(){ play(rps[2]); });
});

function play(choice){
  var rand = Math.floor(Math.random()*3);
  var result = rps[rand];
  var consequence = "draw";
  var msg = '';
  resetButtons();

  // for(i in rps){
  //   if(rps[i] != choice){
  //     $("#"+rps[i]).fadeOut("slow");
  //   }
  // }
  // $("#game-buttons").addClass("final");
  // $("#game-buttons").removeClass("initial");
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
      $('#win').fadeIn("slow");
      break;
    case 'lose':
      $('#lose').fadeIn("slow");
      break;
    case 'draw':
      $('#draw').fadeIn("slow");
      break;
  }
  $('#front-logo').fadeIn("slow");
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

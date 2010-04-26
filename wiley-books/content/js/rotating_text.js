// This requires skillz
var rock_definitions = ['I. 1. a. A large rugged mass of stone forming a cliff, crag, or natural prominence on land or in the sea.',
                        '2. orig. U.S. a. Musical rhythm characterized by a strong beat.'];
var paper_definitions = ['heirushfiusahgf', 'sdiufghadisufghiadghsfiuasdiufgiuasdgf'];
var scissors_definitions = ['cow cow', 'moo moo'];
var increments = {"#rock_text":0, "#paper_text":0, "#scissors_text":0};

$(document).ready(function() {
  $("#rock_def").click(function(){ rotate(rock_definitions, '#rock_text'); });
  $("#paper_def").click(function(){ rotate(paper_definitions, '#paper_text'); });
  $("#scissors_def").click(function(){ rotate(scissors_definitions, '#scissors_text'); });  
});

function rotate(text_array, div_id){
  var limit = text_array.length;
  increments[div_id]++;
  var index = increments[div_id] % limit;
  $(div_id).text(text_array[index]);
  
}

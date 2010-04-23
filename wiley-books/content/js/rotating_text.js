// This requires jQuery
var rock_defenitions = [];
var paper_defenitions = [];
var scissor_defenitions = [];

$(document).ready(function() {
  //TODO: There has to be a better way to do this
  $("#"+rock_text).click(function(){ rotate(rock_defenitions); });
  $("#"+paper_text).click(function(){ rotate(paper_defenitions); });
  $("#"+scissors_text).click(function(){ rotate(scissors_defenitions); });  
});

function rotate(element){
  
}
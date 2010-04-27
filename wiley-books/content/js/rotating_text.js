// This requires skillz
var rock_definitions = ['2. a. A large rugged mass of stone forming a cliff, crag, or natural prominence on land or in the sea.',
                        '3. orig. U.S. a. Musical rhythm characterized by a strong beat.',
                        '4. stone in the mass: buildings that stand upon rock.',
                        '5. a stone of any size.',
                        '6. something resembling or suggesting a rock.',
                        '7. a firm foundation or support: The Lord is my rock.',
                        '8. Chiefly British. a kind of hard candy, variously flavored.'];
var paper_definitions = ['2. a piece, sheet, or leaf of this.', 
                         '3. something resembling this substance, as papyrus.',
                         '4. a written or printed document or the like.',
                         '5. stationery; writing paper.',
                         '6. an essay, article, or dissertation on a particular topic: a paper on early Mayan artifacts.',
                         '7. Often, papers. a document establishing or verifying identity, status, or the like: citizenship papers.',
                         '8. negotiable notes, bills, etc., as commercial paper or paper money: Only silver, please, no paper.'];
var scissors_definitions = ['2. (used with a singular verb) Gymnastics. any of several feats in which the legs execute a scissorlike motion.',
                            '3. (used with a singular verb) Wrestling. a hold secured by clasping the legs around the body or head of the opponent.'];
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

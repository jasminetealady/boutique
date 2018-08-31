////FUNCTIONS//////

function showReviews(){
  $.get('/reviews')
}


function attachListeners(){
  $("#show-reviews").click(() => showReviews())
}



/////PAGE LOADED-- ATTACH LISTENERS/////
$(document).ready(function() {
  
});
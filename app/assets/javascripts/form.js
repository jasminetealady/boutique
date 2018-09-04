function addForm (){
  return `<form class="new_review" id="new_review" action="/reviews" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="Cifge+LdLRBqkf5Z47A4cBzFXJqbCdgSezsN0Qz23yNbj5CE2qJzSWmbinurvMRR52p4a43kXF+icvv8aNGZbA==">

  <label for="review_stars">Stars</label><br><br>

  <label class="stars" for="review_stars">1</label>
  <input type="radio" value="1" name="review[stars]" id="review_stars_1">

  <label class="stars" for="review_stars">2</label>
  <input type="radio" value="2" name="review[stars]" id="review_stars_2">

  <label class="stars" for="review_stars">3</label>
  <input type="radio" value="3" name="review[stars]" id="review_stars_3">

  <label class="stars" for="review_stars">4</label>
  <input type="radio" value="4" name="review[stars]" id="review_stars_4">

  <label class="stars" for="review_stars">5</label>
  <input type="radio" value="5" name="review[stars]" id="review_stars_5"><br><br>


  <textarea name="review[review]" id="review_review"></textarea><br>

  
  <input type="hidden" name="id" id="review_id" value="">

  <input type="submit" name="commit" value="Submit Review" data-disable-with="Submit Review">
</form>` 
}
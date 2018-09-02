////FUNCTIONS//////

function Review(attributes) {
  this.id = attributes.id;
  this.userFirstName = attributes.user.first_name;
  this.userLastName = attributes.user.last_name;
  this.stars = attributes.stars;
  this.review = attributes.review;
}


Review.prototype.doAThing = function() {

}

function showReviews() {
  const itemId = $("h3.shop-item-show-title").data("id")

  if ($("#reviews-js").text().length === 0) {
    $.get('/reviews', function (resp) {

      resp.forEach(function (x) {
        
        if (x.item.id === itemId) {
          const newReview = new Review(x)
          const stars = newReview.stars

          $("#reviews-js").append(
            `<div class="review user-review">
              <span class="review-name">${newReview.userFirstName}'s Review</span><br/>
             <div id="rating-js-${newReview.id}" class="rating"></div><br/>
             <p>${newReview.review}</p><br />
            </div>`)

          for (let i = 0; i < stars; i++) {
            $(`#rating-js-${newReview.id}`).append('<i class="fas fa-star"></i>')
          }
        }

      })
    })
    $("#show-reviews").text("Hide Reviews")
  } else {
    $("#reviews-js").empty()
    $("#show-reviews").text("Show Reviews")
  }
}

let itemArray;

function nextItem(){
  const itemId = $("h3.shop-item-show-title").data("id")

  $.get('/items.json', function(response){
    itemArray = response.map(x => x.id)
    let currentItemIndex = itemArray.indexOf(itemId)
    itemArray.splice(currentItemIndex, 1)
    console.log(itemArray)
    let i = 0;
  
      $.get(`/items/${itemArray[i]}.json`, function(resp){
        debugger
        i++
      })
  })


}


function attachListeners(){
  $("#show-reviews").click(function(e){
    e.preventDefault();
    showReviews()
  })

  $("#next-item").click(function(e){
    e.preventDefault();
    nextItem()
  })
}



/////PAGE LOADED-- ATTACH LISTENERS/////
$(document).ready(function() {
  attachListeners()
});
////FUNCTIONS//////

function Review(attributes) {
  this.id = attributes.id;
  this.userFirstName = attributes.user.first_name;
  this.userLastName = attributes.user.last_name;
  this.stars = attributes.stars;
  this.review = attributes.review;
}

function Item(attributes) {
  this.id = attributes.id;
  this.name = attributes.name;
  this.description = attributes.description;
  this.price = attributes.price;
  this.picture = attributes.picture
  this.reviews = attributes.reviews_count
}

Item.prototype.setId = function(id){
  $("h3.shop-item-show-title").data("id", id)
}


Review.prototype.doAThing = function() {
  let html = `<div class="review user-review">
  <span class="review-name">${newReview.userFirstName}'s Review</span><br/>
  <div id="rating-js-${newReview.id}" class="rating"></div><br/>
  <p>${newReview.review}</p><br />
  </div>`

  return html
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
let i = 0;

function nextItem(){
 
  $.get('/items.json', function(response){
    itemArray = response.map(x => x.id)
    
      $.get(`/items/${itemArray[i]}.json`, function(resp){
        const newItem = new Item(resp)
        newItem.setId(newItem.id)
        $(".shop-item-show-title").text(newItem.name)
        $("#price").text("$" + newItem.price + "0")
        $("#description").text(newItem.description)
        $(".shop-item-show-image img").attr('src', "/assets/" + newItem.picture);
        if (i < itemArray.length - 1){
          i++
        } else {
          i = 0;
        }
        let totalStars = 0
        resp.reviews.forEach(x => totalStars += x.stars )
        let averageReview = Math.round(totalStars / resp.reviews.length)
        $("#rating").empty()
        for (let i = 0; i < averageReview; i++) {
          $("#rating").append('<i class="fas fa-star"></i>')
        }
        
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
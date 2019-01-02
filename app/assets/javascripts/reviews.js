function Review(attributes) {
  this.id = attributes.id
  this.userFirstName = attributes.user.first_name
  this.userLastName = attributes.user.last_name
  this.stars = attributes.stars
  this.review = attributes.review
}

function showReviews() {
  //grabs data id of header that we set when we click next item

  const itemId = $("h3.shop-item-show-title").data("id")

  // if there are reviews, get them

  if ($("#show-reviews").text() !== "Hide Reviews") {
    $.get('/reviews', resp => {

      resp.forEach(x => {

        // each review belongs to an item so checking for matching item id

        if (x.item.id === itemId) {
          const newReview = new Review(x)
          const stars = newReview.stars

          //append the review

          $("#reviews-js").append(
            `<div class="review user-review">
              <span class="review-name">${newReview.userFirstName}'s Review</span><br/>
             <div id="rating-js-${newReview.id}" class="rating"></div><br/>
             <p>${newReview.review}</p><br />
            </div>`)

          // for each number of stars, append the star icon

          for (let i = 0; i < stars; i++) {
            $(`#rating-js-${newReview.id}`).append('<i class="fas fa-star"></i>')
          }
        }
      })
    })
    $("#show-reviews").text("Hide Reviews")
  } else {
    hideReviews()
  }
}

function hideReviews() {
  $("#reviews-js").empty()
  $("#show-reviews").text("Show Reviews")
}

function submitReview(form) {

  // grabbing current item id from header
  const itemId = $("h3.shop-item-show-title").data("id")
  // setting value of hidden input to current item id
  $("#review_id").val(itemId)

  // serialize the form & assign to var values to pass to post req
  const values = $(form).serialize()

  // posts review passing in values & shows reviews
  $.post('/reviews.json', values).done(function (resp){
    showReviews()
  })

  

  // unchecks the radio button
  $("input[type=radio]").prop('checked', false)

  // replaces text area with warning to refresh (can't submit form twice)
  $("textarea").val("Refresh to submit a new review")
}
function Review(attributes) {
  this.id = attributes.id
  this.userFirstName = attributes.user.first_name
  this.userLastName = attributes.user.last_name
  this.stars = attributes.stars
  this.review = attributes.review
}

function showReviews() {
  //grabs data id of header

  const itemId = $("h3.shop-item-show-title").data("id")

  if ($("#show-reviews").text() !== "Hide Reviews") {
    $.get(`/items/${itemId}.json`, resp => {

      resp.reviews.forEach(x => {

        const newReview = new Review(x)
        const stars = newReview.stars

        //appends the review

        $("#reviews-js").append(
          `<div class="review user-review">
              <span class="review-name">${newReview.userFirstName}'s Review</span><br/>
             <div id="rating-js-${newReview.id}" class="rating"></div><br/>
             <p>${newReview.review}</p><br />
            </div>`)

        // for each number of stars, appends the star icon

        for (let i = 0; i < stars; i++) {
          $(`#rating-js-${newReview.id}`).append('<i class="fas fa-star"></i>')
        }

        $("#show-reviews").text("Hide Reviews")
      })
    })
  } else {
    hideReviews()
  }
}

function hideReviews() {
  $("#reviews-js").empty()
  $("#show-reviews").text("Show Reviews")
}

function submitReview(form) {

  // grabs current item id from header
  const itemId = $("h3.shop-item-show-title").data("id")
  // setting value of hidden input to current item id
  $("#review_id").val(itemId)

  // serializes the form & assigns to var values to pass to post req
  const values = $(form).serialize()

  // posts review passing in values & shows reviews
  $.post('/reviews.json', values).done(function (resp) {
    showReviews()
  })

  // unchecks the radio button
  $("input[type=radio]").prop('checked', false)

  // replaces text area with warning to refresh (can't submit form twice)
  $("textarea").val("Refresh to submit a new review")
}
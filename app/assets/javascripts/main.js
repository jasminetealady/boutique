
function attachListeners() {


  $("#show-reviews").click(e => {
    e.preventDefault();
    showReviews()
  })

  $("#next-item").click(e => {
    e.preventDefault();
    nextItem()
  })

  $("#new_review").submit(function (e) {
    e.preventDefault();
    // this being the whole form
    submitReview(this)
  })

  $("#see-orders").click(e => {
    e.preventDefault();
    showOrders()
  })
}



/////PAGE LOADED-- ATTACH LISTENERS/////

$(document).on('turbolinks:load', () => {

  attachListeners()

});
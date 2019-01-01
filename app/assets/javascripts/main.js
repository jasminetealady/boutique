////OBJECTS//////

function Review(attributes) {
  this.id = attributes.id
  this.userFirstName = attributes.user.first_name
  this.userLastName = attributes.user.last_name
  this.stars = attributes.stars
  this.review = attributes.review
}

function Item(attributes) {
  this.id = attributes.id
  this.name = attributes.name
  this.description = attributes.description
  this.price = attributes.price
  this.picture = attributes.picture
  this.reviews = attributes.reviews_count
}

function Order(attributes) {
  this.id = attributes.id
  this.createdAt = attributes.created_at
  this.userId = attributes.user.id
  this.total = attributes.total
}

////PROTOTYPES//////

Item.prototype.setId = function (id) {
  $("h3.shop-item-show-title").data("id", id)
}

Item.prototype.format = function (item) {
  const html =
    `<div class="account-order-item">
    <div class="account-order-item-image"> 
      <img src="/assets/${item.picture}"><br />
    </div>
    <p>
      ${item.name}<br/>
      $${item.price}0<br/>
    </p> 
  </div>`
  return html
}

Order.prototype.format = function (order) {
  const html =
    `<div class="account-order-items">
    <h4 class="account-order-purchased">Purchased on ${order.createdAt}</h4><br /><br />
    <div id="order-${order.id}"></div>
    <div class="account-order-subtotal">
      <h3>Subtotal: $${order.total}0</h3>
    </div>
  </div>`
  return html
}

////FUNCTIONS//////

// Reviews //

function showReviews() {
  //grabs data id of header that we set when we click next item

  const itemId = $("h3.shop-item-show-title").data("id")

  // if there are reviews, get them

  if ($("#reviews-js").text().length === 0 && $("#rating").html() !== "") {
    $.get('/reviews', function (resp) {

      resp.forEach(function (x) {

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

// Items //


function nextItem() {

  $.get('/items.json', function (response) {

    //creates array of all item ids to cycle through. i starts at current item index & increments by 1 until end of array 
    const itemArray = response.map(x => x.id)

    const itemId = $("h3.shop-item-show-title").data("id")

    // find index of current item in array & add 1 to get index of next item in array
    let i = itemArray.indexOf(itemId) + 1

    // reset index to 0 if it goes above last index number

    if (i === itemArray.length) {
      i = 0
    }

    //get singular item

    $.get(`/items/${itemArray[i]}.json`, function (resp) {
      const newItem = new Item(resp)

      // sets data id of header to grab current item id in showReviews() && hides reviews from previous item

      newItem.setId(newItem.id)
      hideReviews()

      const itemId = $("h3.shop-item-show-title").data("id")

      // update URL to reflect current itemId

      window.history.pushState({
        itemId: itemId
      }, itemId, itemId);

      // updates link to add to cart so it reflects current item && updates item info

      $(".add-to-cart").attr("href", `/items?id=${newItem.id}`)
      $(".shop-item-show-title").text(newItem.name)
      $("#price").text("$" + newItem.price + "0")
      $("#description").text(newItem.description)
      $(".shop-item-show-image img").attr('src', "/assets/" + newItem.picture);


      // calculate average rating & append number of stars based on #

      let totalStars = 0
      resp.reviews.forEach(x => totalStars += x.stars)
      let averageReview = Math.round(totalStars / resp.reviews.length)
      $("#rating").empty()

      for (let i = 0; i < averageReview; i++) {
        $("#rating").append('<i class="fas fa-star"></i>')
      }


      // hide show review button if there are no reviews, show if there are

      if ($("#rating").html() === "") {
        $("#show-reviews").hide()
      } else {
        $("#show-reviews").show()
      }
    })
  })

}


function submitReview(form) {

  // grabbing current item id from header
  const itemId = $("h3.shop-item-show-title").data("id")

  // setting value of hidden input to current item id
  $("#review_id").val(itemId)

  // serialize the form & assign to var values to pass to post req
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

function showOrders() {
  $.get("/account.json", function (resp) {
    resp.forEach(function (x) {
      const newOrder = new Order(x)
      if ($(`#order-${newOrder.id}`).text() === "") {
        $("#account-info").append(newOrder.format(newOrder))
        x.items.forEach(function (x) {
          const newItem = new Item(x)
          $(`#order-${newOrder.id}`).append(newItem.format(newItem))
        })
      }
    })
  })
}


function attachListeners() {
  $("#show-reviews").click(function (e) {
    e.preventDefault();
    showReviews()
  })

  $("#next-item").click(function (e) {
    e.preventDefault();
    nextItem()
  })

  $("#new_review").submit(function (e) {
    e.preventDefault();
    // this being the whole form
    submitReview(this)
  })

  $("#see-orders").click(function (e) {
    e.preventDefault();
    showOrders()
  })
}



/////PAGE LOADED-- ATTACH LISTENERS/////

$(document).on('turbolinks:load', function () {

  attachListeners()

});
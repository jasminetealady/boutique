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


function showReviews() {
  const itemId = $("h3.shop-item-show-title").data("id")

  if ($("#reviews-js").text().length === 0 && $("#rating").html() !== "") {
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
    hideReviews()
  }
}

function hideReviews(){
  $("#reviews-js").empty()
  $("#show-reviews").text("Show Reviews")
}

let itemArray;
let i = 0;

function nextItem() {
  
  
  $.get('/items.json', function (response) {
    itemArray = response.map(x => x.id)

    $.get(`/items/${itemArray[i]}.json`, function (resp) {
      const newItem = new Item(resp)
      newItem.setId(newItem.id)
      hideReviews()
      $(".add-to-cart").attr("href", `/items?id=${newItem.id}`)
      $(".shop-item-show-title").text(newItem.name)
      $("#price").text("$" + newItem.price + "0")
      $("#description").text(newItem.description)
      $(".shop-item-show-image img").attr('src', "/assets/" + newItem.picture);
      if (i < itemArray.length - 1) {
        i++
      } else {
        i = 0;
      }
      let totalStars = 0
      resp.reviews.forEach(x => totalStars += x.stars)
      let averageReview = Math.round(totalStars / resp.reviews.length)
      $("#rating").empty()
      for (let i = 0; i < averageReview; i++) {
        $("#rating").append('<i class="fas fa-star"></i>')
      }
    })
  })

}


function submitReview(form){
  
  const itemId = $("h3.shop-item-show-title").data("id")
  $("#review_id").val(itemId)
  const values = $(form).serialize()
  $.post('/reviews.json', values).done(function(resp){showReviews()})
  $("input[type=radio").prop('checked', false)
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
    submitReview(this)
  })

  $("#see-orders").click(function (e) {
    e.preventDefault();
    showOrders()
  })
}



/////PAGE LOADED-- ATTACH LISTENERS/////

$(document).on('turbolinks:load', function() {

  attachListeners()

});
function Item(attributes) {
  this.id = attributes.id
  this.name = attributes.name
  this.description = attributes.description
  this.price = attributes.price
  this.picture = attributes.picture
  this.reviews = attributes.reviews_count
}

Item.prototype.setId = id => {
  $("h3.shop-item-show-title").data("id", id)
}

Item.prototype.format = item => {
  // for order history page
  const html = `<div class="account-order-item"><div class="account-order-item-image"><img src="/assets/${item.picture}"><br /></div><p>${item.name}<br/>$${item.price}0<br/></p></div>`
  return html
}

function nextItem() {

  $.get('/items.json', resp => {

    //creates array of all item ids to cycle through. i starts at current item index & increments by 1 until end of array 
    const itemArray = resp.map(x => x.id)

    const itemId = $("h3.shop-item-show-title").data("id")

    // find index of current item in array & add 1 to get index of next item in array
    let i = itemArray.indexOf(itemId) + 1

    // reset index to 0 if it goes above last index number

    if (i === itemArray.length) {
      i = 0
    }

    //get singular item

    $.get(`/items/${itemArray[i]}.json`, resp => {
      const newItem = new Item(resp)

      // sets data id of header to grab current item id in showReviews() && hides reviews from previous item

      newItem.setId(newItem.id)
      hideReviews()

      const itemId = $("h3.shop-item-show-title").data("id")

      // update URL to reflect current itemId

      window.history.pushState({itemId: itemId}, itemId, itemId);

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
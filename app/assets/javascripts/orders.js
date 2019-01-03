function Order(attributes) {
  this.id = attributes.id
  this.purchaseDate = attributes.date
  this.userId = attributes.user.id
  this.total = attributes.total
}

Order.prototype.format = order => {
  const html =
    `<div class="account-order-items"><h4 class="account-order-purchased">${order.purchaseDate}</h4><br /><br /><div id="order-${order.id}"></div><div class="account-order-subtotal"><h3>Subtotal: $${order.total}0</h3></div></div>`
  return html
}

function showOrders() {
  $.get("/account.json", resp => {
    resp.forEach(x => {
      const newOrder = new Order(x)

      //just so clicking button several times doesn't keep loading orders
      if ($(`#order-${newOrder.id}`).text() === "") {
        $("#account-info").append(newOrder.format(newOrder))

        // separate divs for items
        x.items.forEach(x => {
          const newItem = new Item(x)
          $(`#order-${newOrder.id}`).append(newItem.format(newItem))
        })
      }
    })
  })
}
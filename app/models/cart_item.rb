class CartItem < ApplicationRecord
  belong_to :cart
  belongs_to :order
  belongs_to :item
end

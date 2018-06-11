class CartItem < ApplicationRecord
  belongs_to :cart
  belongs_to :order
  belongs_to :item
end

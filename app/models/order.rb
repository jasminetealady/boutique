class Order < ApplicationRecord
  has_one :address
  has_many :cart_items
  has_many :items, through: :cart_items
end

class User < ApplicationRecord
  has_secure_password
  has_many :addresses
  has_many :orders
  has_many :reviews
  has_one :cart
end

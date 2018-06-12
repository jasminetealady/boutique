class User < ApplicationRecord
  has_secure_password
  has_many :addresses
  has_many :orders
  has_many :reviews
  has_one :cart

  def self.find_or_create_by_omniauth(auth)
    where(email: auth["info"]["email"]).first_or_create do |user|
      user.id = auth["info"]["uid"]
      user.password = SecureRandom.hex
    end
  end


end

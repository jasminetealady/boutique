class Item < ApplicationRecord
  has_many :reviews
  has_many :cart_items
  has_many :orders, through: :cart_items
  scope :cheapest, -> { minimum("price") }
  scope :most_reviewed, -> {order(reviews_count: :desc).limit(1)}


  def average_rating
    self.reviews.average(:stars).to_i
  end


end

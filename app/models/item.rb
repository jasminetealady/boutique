class Item < ApplicationRecord
  has_many :reviews
  has_many :cart_items
  has_many :orders, through: :cart_items
  scope :cheapest, -> { minimum("price") }


  def average_rating
    self.reviews.average(:stars).to_i
  end

  #scope method
  def self.top_reviewed
    all.each do |item|
      item.reviews.where(stars: 5)
    end
  end
end

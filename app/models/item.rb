class Item < ApplicationRecord
  has_many :reviews
  has_many :cart_items
  has_many :orders, through: :cart_items
  scope :cheapest, -> { minimum("price") }


  def average_rating
    self.reviews.average(:stars).to_i
  end

  #scope method re-factored in Review
  # def self.top_reviewed
  #   top_reviewed = all.map do |item|
  #     if item.reviews.present?
  #       item.reviews.where(stars: 5)
  #     end
  #   end
  #
  #   top_items = []
  #
  #   top_reviewed.each do |review_collection|
  #     if review_collection.present?
  #     item = Item.find(review_collection.first.item_id)
  #     top_items << item
  #     end
  #   end
  #
  #   top_items
  # end


end

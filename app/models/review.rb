class Review < ApplicationRecord
  belongs_to :item
  belongs_to :user

  #scope method
  def self.top_reviewed
    all.where(stars: 5).map{|i| Item.find(i.item_id)}
  end

end

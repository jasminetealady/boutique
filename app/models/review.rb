class Review < ApplicationRecord
  belongs_to :item, counter_cache: :reviews_count
  belongs_to :user

  #scope method
  def self.top_reviewed
    all.where(stars: 5).map{|i| Item.find(i.item_id)}
  end

  def after_save
    self.update_counter_cache
  end

  def after_destroy
    self.update_counter_cache
  end

  def update_counter_cache
    self.item.reviews_count = Reviews.count( :conditions => ["item_id = ?",self.item.id])
    self.item.save
  end

end

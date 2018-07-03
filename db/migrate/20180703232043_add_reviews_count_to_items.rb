class AddReviewsCountToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :reviews_count, :integer
  end
end

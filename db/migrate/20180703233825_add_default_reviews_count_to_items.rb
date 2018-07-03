class AddDefaultReviewsCountToItems < ActiveRecord::Migration[5.2]
  def change
    change_column_default :items, :reviews_count, 0
  end
end

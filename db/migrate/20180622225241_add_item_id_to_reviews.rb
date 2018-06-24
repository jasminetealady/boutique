class AddItemIdToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :item_id, :integer
  end
end

class AddPicturesToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :picture, :string
  end
end

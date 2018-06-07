class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :user_id
      t.boolean :save_address

      t.timestamps
    end
  end
end

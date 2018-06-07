class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :first_name
      t.string :last_name
      t.string :company
      t.string :address
      t.integer :apt_or_suite
      t.string :city
      t.string :country
      t.string :state
      t.integer :zip_code
      t.string :phone_number

      t.timestamps
    end
  end
end

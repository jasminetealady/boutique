class RemoveZipCodeFromAddresses < ActiveRecord::Migration[5.2]
  def change
    remove_column :addresses, :zip_code, :integer
  end
end

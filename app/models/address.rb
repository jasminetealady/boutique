class Address < ApplicationRecord
  belongs_to :user
  belongs_to :order, optional: true
  accepts_nested_attributes_for :order

  validates :zip_code, presence: { message: "Please Enter Zip Code" }, length: {is: 5, wrong_length: "Zip Code Must Be 5 Digits"}


  validates :first_name, presence: { message: "Please Enter First Name" }
  validates :last_name, presence: { message: "Please Enter Last Name" }
  validates :address, presence: { message: "Please Enter Address" }
  validates :city, presence: { message: "Please Enter City" }
  validates :state, presence: { message: "Please Enter State" }
  validates :country, presence: { message: "Please Enter Country" }

end

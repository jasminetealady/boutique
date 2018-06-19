class Address < ApplicationRecord
  belongs_to :user
  belongs_to :order
  accepts_nested_attributes_for :order
  validates :zip_code, length: { maximum: 5 }
end

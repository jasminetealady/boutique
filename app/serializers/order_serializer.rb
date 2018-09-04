class OrderSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :total
  belongs_to :user
  has_many :cart_items
  has_many :items, through: :cart_items
end

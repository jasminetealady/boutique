class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :picture
  has_many :reviews
end

class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :picture, :reviews_count
  has_many :reviews
end

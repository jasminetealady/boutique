class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :stars, :review, :user_id, :user
  belongs_to :item
end

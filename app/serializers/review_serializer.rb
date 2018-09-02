class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :stars, :review, :user_id
  belongs_to :user
  belongs_to :item
end

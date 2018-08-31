class ReviewsSerializer < ActiveModel::Serializer
  attributes :id, :stars, :review, :user_id
end

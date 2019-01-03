class OrderSerializer < ActiveModel::Serializer
  
  def date
    object.created_at.strftime("Purchased on %m/%d/%Y")
  end

  attributes :id, :date, :total
  belongs_to :user
  has_many :cart_items
  has_many :items, through: :cart_items
end

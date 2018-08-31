class ReviewsController < ApplicationController

  def index
    @reviews = Review.all
    render json: @reviews
  end


  end

  def create
    @item = Item.find(params[:id])
    @review = Review.create(stars: review_params[:stars], review: review_params[:review], user_id: current_user.id, item_id: @item.id)
    redirect_to item_path(@item)
  end

  def review_params
    params.require(:review).permit(:stars, :review, :id, )
  end


end

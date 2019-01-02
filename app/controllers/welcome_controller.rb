class WelcomeController < ApplicationController

  def home
    @items = Review.top_reviewed.uniq.first(3)
    
  end

  def new_page
    @most_reviewed = Item.most_reviewed.first
  end

end

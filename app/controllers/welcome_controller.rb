class WelcomeController < ApplicationController

  def home
    @items = Review.top_reviewed.first(3)
  end

end

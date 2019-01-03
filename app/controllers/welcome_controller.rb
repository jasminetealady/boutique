class WelcomeController < ApplicationController

  def home
    @items = Review.top_reviewed.uniq.first(3)
  end

end

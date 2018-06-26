class WelcomeController < ApplicationController

  def home
    @items = Item.top_reviewed.first(3)
  end
  
end

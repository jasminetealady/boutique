class WelcomeController < ApplicationController

  def home
    # @items = Item.last(3)
    @items = Item.top_reviewed.first(3)
  end
end

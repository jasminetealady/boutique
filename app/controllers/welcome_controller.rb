class WelcomeController < ApplicationController

  def home
    @items = Item.last(3)
  end
end

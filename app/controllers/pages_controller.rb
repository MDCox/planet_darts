class PagesController < ApplicationController
  def index
    @start_coord = Location.all.sample
  end

private
  start_coord
end

class PagesController < ApplicationController
  def index
    location = Location.all.sample
    gon.start_lat = location.latitude.to_f
    gon.start_long = location.longitude.to_f
  end

end

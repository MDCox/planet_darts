class PagesController < ApplicationController
  def index
    if Location.all.size != 0
      location = Location.all.sample
      gon.start_lat = location.latitude.to_f
      gon.start_long = location.longitude.to_f
    end
  end
end

class LocationsController < ApplicationController
  def new
    @location = Location.new
  end

  def create
    # *****needs to be added
    # var latLng = new google.maps.LatLng(12.121221, 78.121212);
    #   streetViewService.getPanoramaByLocation(latLng, STREETVIEW_MAX_DISTANCE, function (streetViewPanoramaData, status) {
    #   if (status === google.maps.StreetViewStatus.OK) {
    #   //ok
    #   } else {
    #     //no ok
    #   }
    # });
    @location = Location.create(latitude: params[:location][:latitude],
                                longitude: params[:location][:longitude])
    redirect_to root_path
  end
end

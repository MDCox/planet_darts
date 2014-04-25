class ScoresController < ApplicationController
  def create
    points = calc_points(score_params[:coord1], score_params[:coord2])
    score = Score.new(points: points)
    @distance = calc_distance(score_params[:coord1], score_params[:coord2])
    if current_user
      current_user.scores << score
    else
      @tempUser = User.new
      @tempUser.scores << score
    end
    respond_to do |f|
      f.js
      f.html { redirect_to root_path}
    end
  end

private
  def score_params
    params.require(:score).permit(:coord1, :coord2)
  end

  def calc_distance(coord1, coord2)

    point1 = coord1.split(',').map {|coord| coord.to_f * (Math::PI/180)}
    point2 = coord2.split(',').map {|coord| coord.to_f * (Math::PI/180)}

    dlat = point2[0] - point1[0]
    dlon = point2[1] - point1[1]

    area = (Math.sin(dlat / 2))**2 + Math.cos(point1[0]) *
           (Math.sin(dlon / 2))**2 * Math.cos(point2[0])
    circumference = 2 * Math.atan2( Math.sqrt(area), Math.sqrt(1-area))
    circumference * 3963
  end

  def calc_points(coord1, coord2)
    distance = calc_distance(coord1, coord2)
    (24901 - distance) / (distance / 10)
  end
end

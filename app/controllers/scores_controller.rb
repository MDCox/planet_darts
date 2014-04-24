class ScoresController < ApplicationController
  def create
    points = calc_points(score_params[:coord1], score_params[:coord2])
    score = Score.new()
    current_user.scores << score
  end

private
  def score_params
    params.require(:score).permit(:coord1, :coord2)
  end

  def calc_distance(coord1, coord2)
    point1 = coord1.map {|coord| coord * (Math::PI/180)}
    point2 = coord2.map {|coord| coord * (Math::PI/180)}

    dlat = point2[0] - point1[0]
    dlon = point2[1] - point1[1]

    area = (Math.sin(dlat / 2))**2 + Math.cos(point1[0]) *
           (Math.sin(dlon / 2))**2 * Math.cos(point2[0])
    circumfrence = 2 * Math.atan2( Math.sqrt(area), Math.sqrt(1-area))
    circumfrence * 3963
  end

  def calc_points(coord1, coord2)
    distance = calc_distance(coord1, coord2)
    (24901 - distance)/100
  end
end

class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :scores

  def avg_score
    score_total = 0
    num_of_scores = scores.length

    scores.each do |score|
      score_total += score.points
    end

    return (score_total / num_of_scores)
  end

  def high_score
    scores.order(:points).last.points
  end

  def low_score
    scores.order(:points).first.points
  end
end

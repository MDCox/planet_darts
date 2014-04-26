class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :scores

  def avg_score
    score_total = 0
    num_of_scores = scores.length

    scores.each do |score|
      score_total += score.points
    end

    if num_of_scores == 0
      "No guesses"
    else
      (score_total / num_of_scores)
    end
  end

  def high_score
    if scores.length != 0
      scores.order(:points).last.points
    else
      "None"
    end
  end

  def low_score
    if scores.length != 0
      scores.order(:points).first.points
    else
      "None"
    end
  end
end

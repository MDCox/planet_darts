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

    return (score_total / num_of_scores)
  end
end

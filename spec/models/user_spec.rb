require 'spec_helper'

describe User do
  it { should have_many :scores }

  describe "avg_score" do
    it "should return average score" do
      user = User.create()
      score1 = Score.create(points: 10)
      score2 = Score.create(points: 0)

      user.scores << score1
      user.scores << score2

      user.avg_score.should eq 5
    end
  end
end

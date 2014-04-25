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
  describe "high_score" do
    it "should return high score" do
      user = FactoryGirl.create(:user, email: "b@b.com", password: "11111111")
      score1 = Score.create(points: 10)
      score2 = Score.create(points: 0)

      user.scores << score1
      user.scores << score2

      user.high_score.should eq 10
    end
  end
  describe "low_score" do
    it "should return low score" do
      user = FactoryGirl.create(:user, email: "b@b.com", password: "11111111")
      score1 = Score.create(points: 10)
      score2 = Score.create(points: 0)

      user.scores << score1
      user.scores << score2

      user.low_score.should eq 0
    end
  end
end

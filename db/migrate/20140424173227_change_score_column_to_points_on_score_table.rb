class ChangeScoreColumnToPointsOnScoreTable < ActiveRecord::Migration
  def change
    rename_column :scores, :score, :points
  end
end

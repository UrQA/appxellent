# == Schema Information
#
# Table name: motion_events
#
#  id               :integer          not null, primary key
#  activity_class   :string(255)
#  param            :string(255)
#  view             :string(255)
#  action_type      :string(255)
#  sleep            :integer
#  client_timestamp :integer
#  test_scenario_id :integer
#  created_at       :datetime
#  updated_at       :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :motion_event do
    seq_id 1
    time_stamp "2014-02-20 16:33:41"
    sleep 1
    activity_class "MyString"
    action_type "MyString"
    param "MyString"
    view "MyString"
  end
end

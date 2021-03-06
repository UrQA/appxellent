# == Schema Information
#
# Table name: apks
#
#  id            :integer          not null, primary key
#  apk           :string(255)
#  test_apk      :string(255)
#  test_bed_apk  :string(255)
#  package_name  :string(255)
#  activity_name :string(255)
#  min_sdk       :string(255)
#  target_sdk    :string(255)
#  project_id    :integer
#  created_at    :datetime
#  updated_at    :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :apk do
    apk "MainApp.apk"
    test_apk "TestMainApp.apk"
    project_id 1
  end
end

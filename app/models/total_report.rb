# == Schema Information
#
# Table name: total_reports
#
#  id            :integer          not null, primary key
#  apk           :string(255)
#  test_datetime :string(255)
#  project_id    :integer
#  deviceship_id :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class TotalReport < ActiveRecord::Base
  belongs_to :project
  has_many :detail_reports

  mount_uploader :apk, ApkUploader
  # mount_uploader :test_apk, ApkUploader

  # validates :apk, presence: true
  # validates :test_datetime, presence: true

  def generate_test_apk(apk)
  	secret_password = "Zodlxj10"
  	shell_path = "#{Rails.root}/lib/test_apk_generator"
  	test_sh = "#{shell_path}/test_.sh"
  	apk = "#{shell_path}/TestAndroid.apk" # apk address
  	apk_name = apk.split("/").last
		test_apk_target = "/uploads/#{self.class.to_s.underscore}/test_apk/#{self.id}/NewTest#{apk_name}"
		result = `echo #{secret_password} | sudo -S sh #{test_sh} #{apk} #{test_apk} #{shell_path}`

		result ? test_apk : nil

		shell_path
  end
end

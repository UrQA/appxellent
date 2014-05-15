# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# path_to_file = "#{Rails.root}/lib/test_apk_generator/TestAndroid.apk"
# test_path_to_file = "#{Rails.root}/lib/test_apk_generator/NewTestTestAndroid.apk"

@user = User.create!(email: "foobar@foobar.com", password: "foobarfoo", password_confirmation: "foobarfoo")
@project = @user.projects.create!(name: "First App")

# @apk = @project.apks.new
# @uploader = ApkUploader.new(@apk, :apk)
# @uploader.store!(File.open(path_to_file))
# @apk.apk = @uploader
# @apk.project_id = @project.id
# @apk.save!

# (1..10).each do |i|
# 	if i % 2 == 0			
# 		@apk.total_reports.create(status: true, created_at: i.minutes.ago, project_id: 1, app_version: "1.0")
# 	else
# 		@apk.total_reports.create(created_at: i.minutes.ago, project_id: 1, app_version: "1.0")
# 	end
# end

# @test_scenario = @project.test_scenarios.create!(description: "This is a Login Test", rank: 0)
# @project.test_scenarios.create!(description: "This is a Login Test", rank: 0)
# @project.test_scenarios.create!(description: "This is a Login Test", rank: 0)
# @project.test_scenarios.create!(description: "This is a Login Test", rank: 0)
# @project.test_scenarios.create!(description: "This is a Login Test", rank: 0)
# @project.test_scenarios.create!(description: "This is a Login Test", rank: 0)
# @project.test_scenarios.create!(description: "This is a Login Test", rank: 0)

# @total_report = @apk.total_reports.create(status: true, created_at: 1.seconds.ago, project_id: 1, test_datetime: "recent", app_version: "1.0")

# @device = Device.create(brand: "Samsung", cpu: "ARM", model:"Galaxy", os_version: "4.3", country: "KR", device_key: "A2BVDWE")

# @detail_report = @total_report.detail_reports.create!(app_version: "1.0", test_datetime: "2013/03/03 3:00pm", status: 0, running_time: 1200, test_scenario_id: @test_scenario.id, device_key: "A2BVDWE")

# @total_report.detail_reports.create!(app_version: "1.0", test_datetime: "2013/03/03 3:00pm", status: 0, running_time: 1200, test_scenario_id: @test_scenario.id, device_key: "A2BVDWE")

# @total_report.detail_reports.create!(app_version: "1.0", test_datetime: "2013/03/03 3:00pm", status: 0, running_time: 1200, test_scenario_id: @test_scenario.id, device_key: "A2BVDWE")

# @total_report.detail_reports.create!(app_version: "1.0", test_datetime: "2013/03/03 3:00pm", status: 0, running_time: 1200, test_scenario_id: @test_scenario.id, device_key: "A2BVDWE")

# @total_report.detail_reports.create!(app_version: "1.0", test_datetime: "2013/03/03 3:00pm", status: 0, running_time: 1200, test_scenario_id: @test_scenario.id, device_key: "A2BVDWE")




# @detail_report.memory_infos.create!(
#           mem_total: 10,
#           dalvik_heap_alloc: 10,
#           native_heap_size: 10,
#           mem_alloc: 10,
#           dalvik_heap_size: 10,
#           native_heap_alloc: 10,
#           client_timestamp: 1234
#       )

# @detail_report.memory_infos.create!(
#           mem_total: 10,
#           dalvik_heap_alloc: 10,
#           native_heap_size: 10,
#           mem_alloc: 10,
#           dalvik_heap_size: 10,
#           native_heap_alloc: 10,
#           client_timestamp: 1235
#       )

# @detail_report.cpu_infos.create!(usage: 10,client_timestamp: 1234)
# @detail_report.cpu_infos.create!(usage: 20,client_timestamp: 1235)
# @detail_report.cpu_infos.create!(usage: 30,client_timestamp: 1236)

# @detail_report.motion_event_infos.create!(activity_class: 'asd',
#           param:  '123',
#           view: 'view',
#           sleep: 3000,
#           action_type: 'Click',client_timestamp: 1234)

# @detail_report.motion_event_infos.create!(activity_class: 'asd',
#           param:  '123',
#           view: 'view',
#           sleep: 3000,
#           action_type: 'Click',client_timestamp: 1237)


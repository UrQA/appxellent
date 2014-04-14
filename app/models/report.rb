require 'couchrest_model'

class CpuReport
  include CouchRest::Model::Embeddable

  property :id, Integer
  property :usage, Integer
end

class MemoryReport
  include CouchRest::Model::Embeddable

	property :id, Integer
	property :mem_total, Integer
	property :dalvik_heap_alloc, Integer
	property :native_heap_size, Integer
	property :mem_alloc, Integer
	property :dalvik_heap_size, Integer
	property :native_heap_alloc, Integer
end

class MotionReport
  include CouchRest::Model::Embeddable

	property :id, Integer
	property :activity_class, String
	property :time_stamp, Integer
	property :param, String 
	property :view, String 
	property :sleep, Integer 
	property :action_type, String
end

class Report < CouchRest::Model::Base
	property :app_version, String
	property :detail_report_id, Integer
	property :device_id, String
	property :running_time, String
	property :status, String
	property :test_scenario_id, Integer
	property :total_report_id, Integer
	property :memory_reports, MemoryReport, array: true
	property :cpu_reports, CpuReport, array: true
	property :motion_reports, MotionReport, array: true

	timestamps!

	design do
		view :by_total_report_id
	end

	def self.get_all_reports
		self.all.collect { |report| report }
	end

	def self.get_by_total_report_id_reports(total_report_id)
		self.all.select {|report| report.total_report_id == total_report_id}
	end

	def self.get_report_by_id(report_id)
		self.all.select {|report| report.detail_report_id == report_id}.first
	end

	# def self.get_report_by_id(total_report_id, report_id)
	# 	self.get_by_total_report_id_reports(total_report_id).select{|report| report.detail_report_id == report_id}.first	
	# end
end

# {
#     "app_version":"1.0",
# 	"detail_report_id":1,
# 	"device_id":"galaxy",
# 	"running_time":"1200",
# 	"status":"complete",
# 	"test_scenario_id":1,
# 	"total_report_id":1,
#     "type": "Report",
# 	"memory_reports":[
#         {
#             "id" : 1,
#             "mem_total" : 10,
#             "dalvik_heap_alloc": 10,
#             "native_heap_size": 10,
#             "mem_alloc": 10,
#             "dalvik_heap_size": 10,
#             "native_heap_alloc": 10,
#             "type": "MemoryReport"
#         },
#         {
#             "id" : 2,
#             "mem_total" : 10,
#             "dalvik_heap_alloc": 10,
#             "native_heap_size": 10,
#             "mem_alloc": 10,
#             "dalvik_heap_size": 10,
#             "native_heap_alloc": 10,
#             "type": "MemoryReport"
#         }
#         ],
# 	"cpu_reports":[
#         {
#             "id" : 1,
#             "usage" : 10,
#             "type" : "CpuReport"
#         },
#         {
#             "id" : 2,
#             "usage" : 20,
#             "type" : "CpuReport"
#         }
#         ],
# 	"motion_reports":[
#         {
#             "id" : 1,
#             "activity_class" : "asd",
#             "time_stamp" : 1,
#             "param" : "123",
#             "view" : "view",
#             "sleep" : 3000,
#             "action_type" : "Click",
#             "type" : "MotionReport"
#         },
#         {
#             "id" : 2,
#             "activity_class" : "asd",
#             "time_stamp" : 1,
#             "param" : "123",
#             "view" : "view",
#             "sleep" : 3000,
#             "action_type" : "Click",
#             "type" : "MotionReport"
#         }
#         ]
# }
# == Schema Information
#
# Table name: cpu_methods
#
#  id               :integer          not null, primary key
#  tree_key         :integer
#  parent_key       :integer
#  class_name       :string(255)
#  method_name      :string(255)
#  start_timestamp  :integer
#  end_timestamp    :integer
#  detail_report_id :integer
#  created_at       :datetime
#  updated_at       :datetime
#

require 'spec_helper'

describe CpuMethod do
  pending "add some examples to (or delete) #{__FILE__}"
end

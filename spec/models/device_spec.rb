# == Schema Information
#
# Table name: devices
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  os_version    :string(255)
#  model_name    :string(255)
#  cpu_info      :string(255)
#  deviceship_id :integer
#  project_id    :integer
#  created_at    :datetime
#  updated_at    :datetime
#

require 'spec_helper'

describe Device do
  pending "add some examples to (or delete) #{__FILE__}"
end

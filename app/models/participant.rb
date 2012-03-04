class Participant
  include Mongoid::Document

  field :id
  field :name, :type => String
  field :bio, :type => String
  field :title, :type => String
  field :pic_file_name, :type => String
  field :group_name, :type => String

end

class Participant
  include Mongoid::Document

  field :id
  field :name, :type => String
  field :bio, :type => String
  field :title, :type => String
  field :pic_file_name, :type => String
  field :group_name, :type => String

 # references_one :session
  has_many :sessions

  #has_many :sessions, as: :speakers

  #has_many :sessions, as: :panelists


  belongs_to :panelists, polymorphic: true

end

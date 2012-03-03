class Session
  include Mongoid::Document
  include Mongoid::Timestamps

  field :id
  field :name
  field :desc

  #field :date, :type => Date

  field :start, :type => Time
  field :end, :type => Time

  field :slot

  field :participant

  field :panelists

  field :type

  field :location

  #referenced_in :participant

  belongs_to :participant
  #belongs_to :speakers, polymorphic: true
  #belongs_to :panelists, polymorphic: true


end

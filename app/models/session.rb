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

  field :speaker_id, :type => BSON::ObjectId
  field :speaker

  field :moderator_id, :type => BSON::ObjectId
  field :moderator

  field :panelist_ids, :type => Array
  field :panelists

  field :type

  field :location


end

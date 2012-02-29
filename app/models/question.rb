class Question
  include Mongoid::Document
  include Mongoid::Timestamps

  field :id
  field :desc
  field :panel

  field :status
end

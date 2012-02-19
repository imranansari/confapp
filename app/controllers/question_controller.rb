class QuestionController < ApplicationController

  def index
    render :layout => false
  end

  def moderate
    render :layout => false
  end

  def new
    render :layout => false
  end

  def update
    puts "update called"
    respond_to do |format|
      format.json {
        question = JSON.parse(request.body.read)

        updateQuestion = Question.where(:_id => question["_id"]).first
        updateQuestion.status = question["status"]

        updateQuestion.save

        render json: question
      }
    end
  end

  def list
    respond_to do |format|
      format.json {
        questions = Question.all
        render json: questions
      }
    end
  end

  def create
    puts "create new"

    respond_to do |format|
      format.json {
        question = JSON.parse(request.body.read)

        newQuestion = Question.new
        newQuestion.desc = question["desc"]

        newQuestion.save

        puts question

        render json: question
      }
    end
  end

end

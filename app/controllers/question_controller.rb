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

        updateQuestion = Question.where(:_id => question["id"]).first
        updateQuestion.status = question["status"]

        updateQuestion.save

        Juggernaut.publish("moderated_questions", question)

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
        newQuestion.panel = question["panel"]

        newQuestion.save

        puts question
        question["id"] = newQuestion._id

        Juggernaut.publish("questions", question)

        render json: question
      }
    end
  end

end

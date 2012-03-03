class AgendaController < ApplicationController

  def index
    render :layout => false
  end

  def list
    respond_to do |format|
      format.json {

        newSession = Session.new
        newSession.name = "Reimagine"
        newSession.desc = "Soim test"


        year = 2012
        month = 3
        day = 12

        #newSession.start = Time.mktime(year, month, day)
        #newSession.end = Time.mktime(year, month, day-1)

        #newSession.start = DateTime.parse("2012-03-12 10:00")
        #newSession.end = DateTime.parse("2012-03-12 11:00")
        #
        #newSession.type = "Presentation"
        #
        #newSession.slot = newSession.start.strftime("%I:%M%P") +" - " + newSession.end.strftime("%I:%M%P")
        #
        #newSession.save


        #Person.order_by([[:first_name, :asc], [:last_name, :desc]])

        sessions = Session.all.order_by([:start, :desc])

        sessions_with_speakers = Array.new

        speakerProfile = {"name" => "Scott",
                          "title" => "AVP DIS",
                          "photo" => "omsurl"
        }


        sessions.each { |session|
          puts session["name"]
          session[:speakerProfile] = speakerProfile
          sessions_with_speakers.push session
          #session[:speakerProfile] = speakerProfile
        }


        render json: sessions
      }
    end
  end

  def loadData
    respond_to do |format|
      format.json {

        jsonData = File.read(File.join('public/data', 'agenda1.json'))

        #puts jsonData

        sessions = JSON.parse(jsonData)

        #puts sessions[0]["name"]

        sessions.each { |session|
          print session["name"]

          newSession = Session.new
          newSession.name = session["name"]
          newSession.desc = session["desc"]


          #newSession.start = DateTime.parse("2012-03-12 10:00")
          newSession.start = DateTime.parse(session["start"])

          if !session["end"].nil?
            newSession.end = DateTime.parse(session["end"])
            newSession.slot = newSession.start.strftime("%I:%M%P") +" - " + newSession.end.strftime("%I:%M%P")
          else
            newSession.slot = newSession.start.strftime("%I:%M%P")
          end

          if !session["participant_id"].nil?
            session["participant_id"]
            participant = Participant.where(:_id => session["participant_id"]).first
            newSession.participant = participant

            newSession.save
          end

          if !session["location"].nil?
            newSession.location = session["location"]
          end

          newSession.type = session["type"]
          newSession.save
        }

        #Session.collection.insert(sessions)

        render json: {:success => 'true'}.to_json
      }
    end
  end

  def create
    puts "create new"

    respond_to do |format|
      format.json {

        #newSession = Session.new
        #newSession.name = "some session name"
        #
        #newParticipant = Participant.new
        #newParticipant.name = "Imran"
        #
        #newSession.participant = newParticipant
        #
        #newSession.participant.save
        #newSession.save


        #newSession = Session.new
        #newSession.name = "some session name"
        #
        #newParticipant = Participant.new
        #newParticipant.name = "Imran"
        #
        #newParticipant.session = newSession
        #
        #newParticipant.session.save
        #newParticipant.save


        #Speaker

        newSession = Session.new
        newSession.name = "My Sesison 1"

        newParticipant = Participant.new
        newParticipant.name = "Imran"

        newSession.participant = newParticipant

        newSession.participant.save
        newSession.save


        #newSession = Session.new
        #newSession.name = "My Sesison 1"
        #
        #newParticipant1 = Participant.new
        #newParticipant1.name = "Imran"
        #
        #newParticipant2 = Participant.new
        #newParticipant2.name = "Numayra"
        #
        ##newSession.panelist = newParticipant
        #newSession.panelists.push(newParticipant1)
        #newSession.panelists.push(newParticipant2)
        #
        #newSession.panelist.save
        #newSession.save


        render json: {:success => true}
      }
    end
  end

  def createPanelist
      puts "create new"

      respond_to do |format|
        format.json {

          #newSession = Session.new
          #newSession.name = "some session name"
          #
          #newParticipant = Participant.new
          #newParticipant.name = "Imran"
          #
          #newSession.participant = newParticipant
          #
          #newSession.participant.save
          #newSession.save


          #newSession = Session.new
          #newSession.name = "some session name"
          #
          #newParticipant = Participant.new
          #newParticipant.name = "Imran"
          #
          #newParticipant.session = newSession
          #
          #newParticipant.session.save
          #newParticipant.save


          #Speaker

          newSession = Session.new
          newSession.name = "My Sesison 1"

          newParticipant1 = Participant.new
          newParticipant1.name = "Imran"

          newParticipant2 = Participant.new
          newParticipant2.name = "Numayra"

          #newSession.participants.new(newParticipant1)
          newSession.save
          newSession.participants.create(name: "Imran")
          newSession.participants.create(name: "Numi")


          #newSession.participants.save


          #newSession = Session.new
          #newSession.name = "My Sesison 1"
          #
          #newParticipant1 = Participant.new
          #newParticipant1.name = "Imran"
          #
          #newParticipant2 = Participant.new
          #newParticipant2.name = "Numayra"
          #
          ##newSession.panelist = newParticipant
          #newSession.panelists.push(newParticipant1)
          #newSession.panelists.push(newParticipant2)
          #
          #newSession.panelist.save
          #newSession.save


          render json: {:success => true}
        }
      end
    end

end

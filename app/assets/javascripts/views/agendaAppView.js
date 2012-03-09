getActivitiesFromService = function ($) {
    var data;

    $.ajax({
        url:'/storymap/activity?projectId=' + PROJECT_ID,
        type:'GET',
        dataType:'json',
        async:false,
        success:function (dataFromService) {
            data = dataFromService;
        }});
    return data;
};

define([
    'jquery',
    'underscore',
    'backbone',
    'models/session',
    'collections/sessions',
    'views/sessionsView',
    'views/sessionDetailView',
    'views/speakerDetailView',
    'views/newQuestionView'
], function ($, _, Backbone, Session, Sessions, SessionsView, SessionDetailView, SpeakerDetailView, NewQuestionView) {

    var AppRouter = Backbone.Router.extend({
        routes:{
            "agenda/details/:id":"getSessionDetails",
            "agenda/newquestion":"displayNewQuestion",
            "agenda/day/:day":"displayAgendaForDay",
            "agenda/index":"getAgendaList",
            "agenda/:id/panelist/:panelistId":"getPanelistInfo",
            "speaker/profile/:id":"getSpeakerInfo",
            "*actions":"getAgendaList"
        },
        getSessionDetails:function (id) {
            //$("#pageContainer").html("Details");
            //window.sessionsView.remove();

            var myModel = window.sessionsCollection.get(id);
            console.log(myModel);

            //$(".toolbar").html(myModel.get("name"));
            $("#header2").hide();

            $('#agendaList').html('');
            $('#wrapper ul').css("background-color", "#f5f5f5");
            $("#wrapper").css("top", "36px");
            $("#wrapper").css("height", window.innerHeight-36 +"px");

            window.sessionDetailView = new SessionDetailView({model:myModel});
            $('#agendaList').append(sessionDetailView.render().el);


            window.scroll.refresh();
        },

        getAgendaList:function () {
            console.log("show agenda list");

            if (window.sessionDetailView != undefined) {
                window.sessionDetailView.remove();
            }

            if (window.newQuestionView != undefined) {
                window.newQuestionView.remove();
            }

            if (window.sessionsCollection == undefined) {
                window.sessionsCollection = new Sessions();
                sessionsCollection.fetch({
                    success:function (sessionsCollection) {

                        //approvedCollection = new Sessions(sessionsCollection.approved());

                        //$("#wrapper").html('<ul id="agendaList" class="agenda-icon-list"> ');

                        /*                        window.sessionsView = new SessionsView({collection:sessionsCollection});
                         sessionsView.render();*/

                        window.appRouter.navigate("agenda/day/03-12", true);

                        //alert('getAgendaList');
                    }
                });
            } else {
                window.sessionsView = new SessionsView({collection:sessionsCollection});
                sessionsView.render();
            }
        },

        getSpeakerInfo:function (id) {
            console.log(id);

            if (window.sessionDetailView != undefined) {
                window.sessionDetailView.remove();
            }

            var myModel = window.sessionsCollection.get(id);
            console.log(myModel);

            //$(".toolbar").html(myModel.get("speaker").name);

            window.speakerDetailView = new SpeakerDetailView({model:myModel});

            $("#header2").hide();
            $('#agendaList').html('');
            $("#wrapper").css("top", "36px");
            $("#wrapper").css("height", window.innerHeight-36 +"px");
            $('#agendaList').append(speakerDetailView.render().el);


            //window.scroll.refresh();
        },

        getPanelistInfo:function (id, panelistId){
            console.log(id);

                       if (window.sessionDetailView != undefined) {
                           window.sessionDetailView.remove();
                       }

                       var myModel = window.sessionsCollection.get(id);
                       console.log(myModel);

                       //$(".toolbar").html(myModel.get("speaker").name);

                       window.speakerDetailView = new SpeakerDetailView({model:myModel, panelistId: panelistId});

                       $("#header2").hide();
                       $('#agendaList').html('');
                       $("#wrapper").css("top", "36px");
                       $("#wrapper").css("height", window.innerHeight-36 +"px");
                       $('#agendaList').append(speakerDetailView.render().el);

        },

        displayNewQuestion:function () {
            $("#header2").hide();
            $("#agendaList").removeAttr("style");
            $('#agendaList').html('');
            $("#wrapper").css("top", "36px");
            window.newQuestionView = new NewQuestionView();
            $('#agendaList').append(newQuestionView.render().el);
        },

        displayAgendaForDay:function (day) {
            //alert('displayAgendaForDay '+ day);
            $('#agendaList').html('');
            $('#wrapper ul').css("background-color", "white");
            $("#wrapper").css("top", "70px");
            $("#wrapper").css("height", window.innerHeight-70 +"px");

            if(window.sessionsCollection == undefined){
                this.getAgendaList();
                return;
            }
            var mondayCollection = new Sessions(sessionsCollection.getSessionsByDate(day));

            //alert(mondayCollection.length);
            //alert("sessioncoll size: " +sessionsCollection.length);

            window.sessionsView = new SessionsView({collection:mondayCollection});
            sessionsView.render();
        }
    });
    // Instantiate the router
    window.appRouter = new AppRouter;
    // Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start();

    $(document).ready(function () {


        //alert(window.innerHeight);
        //alert($('#wrapper').height());


        $("#speakersButton").click(function () {
            alert('speakers');
        });

        $("#agendaButton").click(function () {
            //window.appRouter.navigate("agenda/index", true);
            window.appRouter.navigate("agenda/day/03-12", true);
        });

        $("#postQuestionButton").click(function () {
            window.appRouter.navigate("agenda/newquestion", true);
        });

        $(".dateFilter").click(function () {
            window.appRouter.navigate("agenda/day/" + $(this).data("date"), true)
        });


        $(".sessionPanelist").live('click', function(){
            window.appRouter.navigate("agenda/" + $(this).data("sessionid")+ "/panelist/" +$(this).data("panelistid") , true);
        });

        //sessionsCollection = new Sessions();

        //var approvedCollection;

        /*        var jug = new Juggernaut;
         jug.subscribe("moderated_questions", function (data) {
         console.log("Got data: " + data);
         if (data.status === 'approved') {
         approvedCollection.add(data);
         }
         });*/

        /*        sessionsCollection.fetch({
         success:function (sessionsCollection) {

         //approvedCollection = new Sessions(sessionsCollection.approved());

         var sessionsView = new SessionsView({collection:sessionsCollection, el:$('#agendaList')});
         sessionsView.render();
         }
         });*/

    });


    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);


    var AgendaAppView = Backbone.View.extend({


    });


    return AgendaAppView;
});

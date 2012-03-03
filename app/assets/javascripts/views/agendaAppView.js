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
    'views/speakerDetailView'
], function ($, _, Backbone, Session, Sessions, SessionsView, SessionDetailView, SpeakerDetailView) {

    var AppRouter = Backbone.Router.extend({
        routes:{
            "agenda/details/:id":"getSessionDetails",
            "agenda/index":"getAgendaList",
            "speaker/profile/:id":"getSpeakerInfo"
        },
        getSessionDetails:function (id) {
            //$("#pageContainer").html("Details");
            //window.sessionsView.remove();

            window.scroll = new iScroll('wrapper', { vScrollbar:false, hScrollbar:false, hScroll:false });
            var myModel = window.sessionsCollection.get(id);
            console.log(myModel);

            $(".toolbar").html(myModel.get("name"));

            window.sessionDetailView = new SessionDetailView({model:myModel});

            $('#agendaList').html('');
            $('#agendaList').append(sessionDetailView.render().el);


            window.scroll.refresh();
        },

        getAgendaList:function (id) {
            console.log("show agenda list");

            if(window.sessionDetailView != undefined){
                window.sessionDetailView.remove();
            }

            window.sessionsCollection = new Sessions();
            sessionsCollection.fetch({
                success:function (sessionsCollection) {

                    //approvedCollection = new Sessions(sessionsCollection.approved());

                    //$("#wrapper").html('<ul id="agendaList" class="agenda-icon-list"> ');

                    window.sessionsView = new SessionsView({collection:sessionsCollection});
                    sessionsView.render();
                }
            });

        },

        getSpeakerInfo:function(id){
            console.log(id);

            if(window.sessionDetailView != undefined){
                window.sessionDetailView.remove();
            }

            var myModel = window.sessionsCollection.get(id);
            console.log(myModel);

            $(".toolbar").html(myModel.get("participant").name);

            window.speakerDetailView = new SpeakerDetailView({model:myModel});

            $('#agendaList').html('');
            $('#agendaList').append(speakerDetailView.render().el);


            //window.scroll.refresh();
        }
    });
    // Instantiate the router
    window.appRouter = new AppRouter;
    // Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start({pushState:true});

    $(document).ready(function () {


        //alert(window.innerHeight);
        //alert($('#wrapper').height());


        $("#speakersButton").click(function () {
            alert('speakers');
        });

        $("#agendaButton").click(function () {
            alert('agenda');
            window.scroll.refresh();
        })

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

    var AgendaAppView = Backbone.View.extend({


    });


    return AgendaAppView;
});

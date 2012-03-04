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
            "agenda/index":"getAgendaList",
            "speaker/profile/:id":"getSpeakerInfo"
        },
        getSessionDetails:function (id) {
            //$("#pageContainer").html("Details");
            //window.sessionsView.remove();

            //window.scroll = new iScroll('wrapper', { vScrollbar:false, hScrollbar:false, hScroll:false });
            var myModel = window.sessionsCollection.get(id);
            console.log(myModel);

            $(".toolbar").html(myModel.get("name"));
            $('#agendaList').html('');

                window.sessionDetailView = new SessionDetailView({model:myModel});
                $('#agendaList').append(sessionDetailView.render().el);


            window.scroll.refresh();
        },

        getAgendaList:function (id) {
            console.log("show agenda list");

            if (window.sessionDetailView != undefined) {
                window.sessionDetailView.remove();
            }

            if (window.newQuestionView != undefined) {
                window.newQuestionView.remove();
            }

            if(window.sessionsCollection == undefined){
            window.sessionsCollection = new Sessions();
            sessionsCollection.fetch({
                success:function (sessionsCollection) {

                    //approvedCollection = new Sessions(sessionsCollection.approved());

                    //$("#wrapper").html('<ul id="agendaList" class="agenda-icon-list"> ');

                    window.sessionsView = new SessionsView({collection:sessionsCollection});
                    sessionsView.render();
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

            $(".toolbar").html(myModel.get("speaker").name);

            window.speakerDetailView = new SpeakerDetailView({model:myModel});

            $('#agendaList').html('');
            $('#agendaList').append(speakerDetailView.render().el);


            //window.scroll.refresh();
        },

        displayNewQuestion:function(){
            $(".toolbar").html("Post New Question");
            $('#agendaList').html('');
            window.newQuestionView = new NewQuestionView();
            $('#agendaList').append(newQuestionView.render().el);
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
            window.appRouter.navigate("agenda/index", true);
        });

        $("#postQuestionButton").click(function(){
            window.appRouter.navigate("agenda/newquestion", true);
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

    function loaded() {
        window.scroll = new iScroll('wrapper', {
                    vScrollbar:false,
                    hScrollbar:false,
                    hScroll:false,
                    useTransform: false,
                    onBeforeScrollStart: function (e) {
                        var target = e.target;
                        while (target.nodeType != 1) target = target.parentNode;

                        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                            e.preventDefault();
                    }
                });
            }


            document.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);

            document.addEventListener('DOMContentLoaded', loaded, false);

    var AgendaAppView = Backbone.View.extend({


    });


    return AgendaAppView;
});

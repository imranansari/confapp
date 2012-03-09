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
    'livequery',
    'timeago',
    'underscore',
    'backbone',
    'juggernaut',
    'models/question',
    'collections/questions',
    'views/questionsView'
], function ($, livequery, timeago, _, Backbone, juggernaut, Question, Questions, QuestionsView) {

    $(document).ready(function () {

        var questionsCollection = new Questions();
        var itVpPanelCollection;
        var bizLeaderPanelCollection;
        var globalDeliveryCollection;

        var jug = new Juggernaut;
        jug.subscribe("moderated_questions", function (data) {
            console.log("Got data: " + data);
            if (data.status === 'approved') {
                if(data.panel == 'IT VP Panel'){
                    itVpPanelCollection.add(data);
                } else if(data.panel == 'Business Leader Panel'){
                    bizLeaderPanelCollection.add(data)
                }  else if(data.panel == 'Global Delivery Panel'){
                    globalDeliveryCollection.add(data)
                }
            }
        });

        questionsCollection.fetch({
            success:function (questionsCollection) {

                //approvedCollection = new Questions(questionsCollection.approved('Business Leader Panel'));

                bizLeaderPanelCollection = new Questions(questionsCollection.approved('Business Leader Panel'));
                itVpPanelCollection = new Questions(questionsCollection.approved('IT VP Panel'));
                globalDeliveryCollection = new Questions(questionsCollection.approved('Global Delivery Panel'));

                var bizLeaderPanelView = new QuestionsView({collection:bizLeaderPanelCollection, el:$('#bizLeaderPanelCollection')});
                var itVpPanelView = new QuestionsView({collection:itVpPanelCollection, el:$('#itVpPanelCollection')});
                var globalDeliveryPanelView = new QuestionsView({collection:globalDeliveryCollection, el:$('#globalDeliveryCollection')});

                bizLeaderPanelView.render();
                itVpPanelView.render();
                globalDeliveryPanelView.render();
            }
        });

        $('.question').livequery(function () {
            $(this).show();
            $(this).addClass('bounceInDown');
        });

        $("time.timeago").livequery(function(){
            $("time.timeago").timeago();
        })
    });

    var DisplayQuestionsView = Backbone.View.extend({


    });


    return DisplayQuestionsView;
});

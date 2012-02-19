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
    'juggernaut',
    'models/question',
    'collections/questions',
    'views/questionsView'
], function ($, _, Backbone, juggernaut, Question, Questions, QuestionsView) {

    $(document).ready(function () {

        var questionsCollection = new Questions();
        var approvedCollection;

        var jug = new Juggernaut;
        jug.subscribe("moderated_questions", function (data) {
            console.log("Got data: " + data);
            if (data.status === 'approved') {
                approvedCollection.add(data);
            }
        });

        questionsCollection.fetch({
            success:function (questionsCollection) {

                approvedCollection = new Questions(questionsCollection.approved());

                var questionsView = new QuestionsView({collection:approvedCollection, el:$('#questions')});
                questionsView.render();
            }
        });

    });

    var DisplayQuestionsView = Backbone.View.extend({


    });


    return DisplayQuestionsView;
});

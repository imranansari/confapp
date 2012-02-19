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
    'models/question',
    'collections/questions',
    'views/questionsView'
], function ($, _, Backbone, Question, Questions, QuestionsView) {

    $(document).ready(function () {

        var questionsCollection = new Questions();
        questionsCollection.fetch({
            success:function (questionsCollection) {
                var questionsView = new QuestionsView({collection:questionsCollection, mode:"admin"});
                $("#questions").prepend(questionsView.render().el);
            }
        });

    });

    var ModerateQuestionsView = Backbone.View.extend({


    });

    return ModerateQuestionsView;
});

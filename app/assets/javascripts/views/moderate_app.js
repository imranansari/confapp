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

        //add questions to collection
        Questions.add({desc: "Whats up doc?"});
        Questions.add({desc: "Whats up Juranomo ?"});
        Questions.add({desc: "Whats up Honorable Doc ?"});

        var questionsView = new QuestionsView({collection: Questions, mode: "admin"});

        $("#questions").prepend(questionsView.render().el);
        //init QuestionsView with collection
        //render to dom


    });

    var ModerateQuestionsView = Backbone.View.extend({


    });


    return ModerateQuestionsView;
});

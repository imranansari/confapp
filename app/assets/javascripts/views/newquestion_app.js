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
    'views/newQuestionView'
], function ($, _, Backbone, Question, Questions, NewQuestionView) {

    $(document).ready(function () {

        var newQuestionView = new NewQuestionView();
        //console.log(newQuestionView.render().el);

        $("#newQuestion").html(newQuestionView.render().el);
        //$("#newQuestion").html("dsds");


    });

    var NewQuestionAppView = Backbone.View.extend({


    });


    return NewQuestionAppView;
});

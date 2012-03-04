define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'modelbinding',
    'text!templates/newquestion.html',
    'models/question',
    'collections/questions'
], function ($, _, Backbone, handlebars, modelbinding, htmlTpl, Question, Questions) {

    Backbone.ModelBinding = require('modelbinding');

    var NewQuestionView = Backbone.View.extend({

        initialize:function (options) {
            console.log('init called');
            this.template = Handlebars.compile(htmlTpl);
        },
        render:function () {
            var content = this.template();
            $(this.el).html(content);
            //Backbone.ModelBinding.bind(this);
            return this;
        },

        events:{
            "click #postNewQuestion":"postNewQuestion"
        },


        postNewQuestion:function () {
            questionDesc = $('#questionDesc').val();
            $('#questionDesc').val('');

            var questionsCollection = new Questions();
            questionsCollection.create({desc: questionDesc});
        }

    });

    return NewQuestionView;
});

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

            try {
                window.scroll.destroy();
            } catch (e) {
                //fix this later
            }

            var content = this.template();
            $(this.el).html(content);
            return this;
        },

        events:{
            "click #postNewQuestion":"postNewQuestion"
        },


        postNewQuestion:function () {
            questionDesc = $('#questionDesc').val();
            questionPanelType = $('#questionPanelType').val();

            if(questionDesc.trim()  === "") {
                alert("You forgot your question");
                return;
            }

            if(questionPanelType === "0") {
                alert("Please select a Panel for your question");
                return;
            }


            $('#questionDesc').val('');

            var questionsCollection = new Questions();
            questionsCollection.create({desc: questionDesc, panel: questionPanelType});
        }

    });

    return NewQuestionView;
});

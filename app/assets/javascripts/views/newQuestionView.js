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
            "click #postNewQuestion":"postNewQuestion",
            "click #cancelNewQuestion":"cancelNewQuestion"
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
            var model = questionsCollection.create({desc: questionDesc, panel: questionPanelType});
            if (model != false){
                alert("Question Submitted");
            }
        },

        cancelNewQuestion:function(){
            window.appRouter.navigate("agenda/day/03-12", true);
        }

    });

    return NewQuestionView;
});

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
            this.template = Handlebars.compile(htmlTpl);
            //this.model = new Message();
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
            //console.log(this.model.toJSON());
            //this.model.save();
            questionDesc = $('#questionDesc').val();
            $('#questionDesc').val('');
            //Messages.add(new Message({desc: messageDesc, dateTime: new Date()}));
            Questions.create({text: questionDesc, dateTime: new Date()});
        }


    });

    return NewQuestionView;
});

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'modelbinding',
    'text!templates/question.html'
], function ($,  _, Backbone, handlebars, modelbinding, htmlTpl) {

    Backbone.ModelBinding = require('modelbinding');

    var QuestionView = Backbone.View.extend({

        //el: $(".question"),

        initialize:function (options) {
            console.log(this.options.mode);

            this.template = Handlebars.compile(htmlTpl);
            _.bindAll(this, 'render', 'remove');
            //this.model.bind('change', this.updateState);
            this.model.bind('change:status', this.updateState);
            this.model.bind('destroy', this.remove);
        },
        render:function () {
            var isAdmin = (this.options.mode == 'admin') ? true : false;
            var content = this.template({model:this.model.toJSON(), isAdmin:isAdmin});

            $(this.el).html(content);

            //Backbone.ModelBinding.bind(this);
            return this;
        },

        remove:function () {

            $(this.el).remove();
        },

        events:{
            "click .decline":"decline",
            "click .approve":"approve",
            "click .question":"highlight"
        },


        highlight:function(){
            $('.question').toggleClass('bounceInDown');
        },

        updateState:function () {
            console.log('state updated ');
            if (this.get('status') == 'approved') {
                $(event.target).siblings().removeClass('btn-danger');
                $(event.target).siblings().html('Decline');

                $(event.target).addClass('btn-success');
                $(event.target).html('Approved');

            } else if (this.get('status') == 'declined') {

                $(event.target).siblings().removeClass('btn-success');
                $(event.target).siblings().html('Approve');


                $(event.target).addClass('btn-danger');
                $(event.target).html('Declined');
            }
        },

        approve:function () {
            this.model.set({status:'approved'});
            this.model.save();
            return this;
        },

        decline:function () {
            this.model.set({status:'declined'});
            this.model.save();
            return true;
        }

    });

    return QuestionView;
});
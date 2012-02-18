define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'modelbinding',
    'text!templates/message.html',
    'models/message'
], function ($, _, Backbone, handlebars, modelbinding, htmlTpl, Message) {

    Backbone.ModelBinding = require('modelbinding');

    var MessageView = Backbone.View.extend({

        initialize:function (options) {
            this.template = Handlebars.compile(htmlTpl);
            _.bindAll(this, 'render', 'remove');
            this.model.bind('change', this.render);
            this.model.bind('destroy', this.remove);
        },
        render:function () {
            var content = this.template(this.model.toJSON());

            $(this.el).html(content);
            //Backbone.ModelBinding.bind(this);
            return this;
        },

        remove:function () {
            $(this.el).remove();
        },

        events:{
            "click #updateMessage":"update"
        },


        update:function () {
            console.log(this.model.toJSON());
            this.model.save();
        }


    });

    return MessageView;
});
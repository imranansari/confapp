define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'modelbinding',
    'text!templates/newmessage.html',
    'models/message',
    'views/messageView'
], function ($, _, Backbone, handlebars, modelbinding, htmlTpl, Message, MessageView) {

    Backbone.ModelBinding = require('modelbinding');

    var MessagesView = Backbone.View.extend({
        initialize:function (options) {
            _.bindAll(this, 'render', 'addAll', 'addOne');
            this.collection.bind('add', this.addOne);
        },
        render:function () {
            //$(this.el).html(this.template());
            this.addAll();
            return this;
        },
        addAll:function () {
            this.collection.each(this.addOne);
        },
        addOne:function (model) {
            view = new MessageView({model:model});
            view.render();
            $(this.el).prepend(view.el);
            model.bind('remove', view.remove);
        }


    });

    return MessagesView;
});
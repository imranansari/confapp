define([
    'underscore',
    'backbone',
    'models/message'
], function (_, Backbone, Message) {

    var Messages = Backbone.Collection.extend({

        // Reference to this collection's model.
        model:Message,

        url:'/message'

    });


    return new Messages;
});

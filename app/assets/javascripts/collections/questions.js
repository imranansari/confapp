define([
    'underscore',
    'backbone',
    'models/question'
], function (_, Backbone, Question) {

    var Questions = Backbone.Collection.extend({
        model:Question,

        url:'/question'

    });


    return new Questions;
});

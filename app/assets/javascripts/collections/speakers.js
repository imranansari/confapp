define([
    'underscore',
    'backbone',
    'models/speaker'
], function (_, Backbone, Speaker) {

    var Speakers = Backbone.Collection.extend({
        model:Speaker,

        url:'/speaker'

    });

    return Speakers;
});

define([
    'underscore',
    'backbone',
    'models/question'
], function (_, Backbone, Question) {

    var Questions = Backbone.Collection.extend({
        model:Question,

        url:'/question',

        approved:function () {
            return this.filter(function (question) {
                return question.get('status') === 'approved';
            });
        }

    });

    return Questions;
});

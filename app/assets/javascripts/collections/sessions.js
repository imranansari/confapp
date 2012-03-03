define([
    'underscore',
    'backbone',
    'models/session'
], function (_, Backbone, Session) {

    var Sessions = Backbone.Collection.extend({
        model:Session,

        url:'/agenda',

        getSessionsByDate:function () {
            return this.filter(function (session) {
                return session.get('status') === 'approved';
            });
        }

    });

    return Sessions;
});

define([
    'jquery',
    'underscore',
    'backbone',
    'models/session'
], function ($, _, Backbone, Session) {

    var Sessions = Backbone.Collection.extend({
        model:Session,

        url:'/agenda',

        getSessionsByDate:function (dt) {
            return this.filter(function (session) {

                var filterDate = new Date('2012-'+ dt +'T18:48:38-05:00');
                //console.log(filterDate.getDate());


                var startDate = new Date(startDate = session.get('start'));


                var retVal = ((startDate.getDate() == filterDate.getDate()) && ((startDate.getMonth() == filterDate.getMonth())));
                //console.log(retVal);
                //console.log("startDate.getDate() " + startDate.getDate());
                //console.log("filterDate.getDate() " + filterDate.getDate());
                return retVal;
            });
        }

    });

    return Sessions;
});

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

                //2010-03-15 10:30:00
                var filterDateStr = '2012-' + dt + ' 10:30:00';
                var sessionDateStr = session.get('startStr');


                var filterDateArr = filterDateStr.split(/[- :]/);
                var filterDate = new Date(filterDateArr[0], filterDateArr[1] - 1, filterDateArr[2], filterDateArr[3], filterDateArr[4], filterDateArr[5]);


                var sessionDateArr = sessionDateStr.split(/[- :]/);
                var sessionDate = new Date(sessionDateArr[0], sessionDateArr[1] - 1, sessionDateArr[2], sessionDateArr[3], sessionDateArr[4], sessionDateArr[5]);


                return ((sessionDate.getDate() == filterDate.getDate()) && ((sessionDate.getMonth() == filterDate.getMonth())));

            });
        }

    });

    return Sessions;
});

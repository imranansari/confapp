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

                //console.log(dt);

                //var filterDate = new Date('2012-'+ dt +'T18:48:38-05:00');
                //console.log(filterDate.getDate());

                //2010-03-15 10:30:00

            var filterDateStr = '2012-'+ dt +' 10:30:00';
            var sessionDateStr = session.get('startStr');



            var filterDateArr = filterDateStr.split(/[- :]/);
            var filterDate = new Date(filterDateArr[0], filterDateArr[1]-1, filterDateArr[2], filterDateArr[3], filterDateArr[4], filterDateArr[5]);

            //console.log(filterDate);

            var sessionDateArr = sessionDateStr.split(/[- :]/);
            var sessionDate = new Date(sessionDateArr[0], sessionDateArr[1]-1, sessionDateArr[2], sessionDateArr[3], sessionDateArr[4], sessionDateArr[5]);

            //console.log(sessionDate);

                //var arr = dateStr.split(/[- :]/);
                //var filterDate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);

        //console.log(filterDate);
        //console.log("filter date" +filterDate.getDate() +" - "+filterDate.getMonth());


                //console.log(Date.parse('2012-'+ dt +'T18:48:38-05:00'));

                //console.log("sessionDateStr = "+ session.get('start'))

                //var startDate = new Date(session.get('start'));
                //var startDate = Date.parse((session.get('start')));
//                console.log(dateStr);
                //console.log("start date" +startDate.getDate() +" - "+startDate.getMonth());

                return ((sessionDate.getDate() == filterDate.getDate()) && ((sessionDate.getMonth() == filterDate.getMonth())));
                //console.log(retVal);
                //console.log("startDate.getDate() " + startDate.getDate());
                //console.log("filterDate.getDate() " + filterDate.getDate());
                //return false;
            });
        }

    });

    return Sessions;
});

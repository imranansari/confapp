define(['underscore',
    'backbone',
    'collections/sessions'], function (_, Backbone, Sessions) {

    Backbone.Model.prototype.toJSON = function() {
      return _(_.clone(this.attributes)).extend({
       'authenticity_token' : $('meta[name="csrf-token"]').attr('content')
      });
     }


    var Session = Backbone.Model.extend({
        idAttribute:"_id",


        initialize:function () {

        }
    });
    return Session;

});

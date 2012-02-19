define(['underscore',
    'backbone',
    'collections/questions'], function (_, Backbone, Questions) {

    Backbone.Model.prototype.toJSON = function() {
      return _(_.clone(this.attributes)).extend({
       'authenticity_token' : $('meta[name="csrf-token"]').attr('content')
      });
     }


    var Question = Backbone.Model.extend({
        idAttribute:"_id",


        initialize:function () {

        }
    });
    return Question;

});

define(['underscore',
    'backbone'
], function (_, Backbone) {

    Backbone.Model.prototype.toJSON = function () {
        return _(_.clone(this.attributes)).extend({
            'authenticity_token':$('meta[name="csrf-token"]').attr('content')
        });
    };


    var Speaker = Backbone.Model.extend({
        idAttribute:"_id",

        initialize:function () {

        }
    });
    return Speaker;

});

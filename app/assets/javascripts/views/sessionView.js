define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'modelbinding',
    'text!templates/session.html'
], function ($,  _, Backbone, handlebars, modelbinding, htmlTpl) {


    var SessionView = Backbone.View.extend({

        tagName : "li",

        initialize:function (options) {

            this.template = Handlebars.compile(htmlTpl);
            _.bindAll(this, 'render', 'remove');
            this.model.bind('destroy', this.remove);
        },
        render:function () {
            var content = this.template(this.model.toJSON());

            $("#header2").show();
            $(this.el).html(content);

            return this;
        },

        remove:function () {

            $(this.el).remove();
        },

        events:{
            "click .agendaItem":"showDetails"
        },


        showDetails:function () {
            //console.log('show details' + this.model);
            window.appRouter.navigate("agenda/details/" + this.model.get("_id"), true);
        }

    });

    return SessionView;
});
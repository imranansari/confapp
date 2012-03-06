define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'modelbinding',
    'text!templates/sessionDetail.html',
    'text!templates/sessionPanelDetail.html',
    'text!templates/sessionActivityDetail.html'
], function ($, _, Backbone, handlebars, modelbinding, sessionDetailTpl, sessionPanelDetailTpl, sessionActivityDetailTpl) {


    var SessionView = Backbone.View.extend({

        tagName:"li",

        initialize:function (options) {

            console.log(this.model.get("type"));
            if (this.model.get("type") == "Panel") {
                this.template = Handlebars.compile(sessionPanelDetailTpl);
            } else if (this.model.get("type") == "Presentation") {
                this.template = Handlebars.compile(sessionDetailTpl);
            } else if (this.model.get("type")  =="Activity"){
                this.template = Handlebars.compile(sessionActivityDetailTpl);
            }

            _.bindAll(this, 'render', 'remove');
            this.model.bind('destroy', this.remove);
        },
        render:function () {
            var content = this.template(this.model.toJSON());

            $(this.el).html(content);

            $(this.el).show(0, function () {
                window.scroll.refresh();
            });

            return this;
        },

        remove:function () {

            $(this.el).remove();
        },

        events:{
            "click .sessionSpeaker":"showSpeaker"
        },


        showSpeaker:function () {
            console.log('show details' + this.model);
            window.appRouter.navigate("speaker/profile/" + this.model.get('_id'), true);
        }

    });

    return SessionView;
});
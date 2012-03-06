define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'modelbinding',
    'text!templates/speakerDetail.html'
], function ($,  _, Backbone, handlebars, modelbinding, htmlTpl) {


    var SpeakerDetailView = Backbone.View.extend({

        tagName : "li",

        initialize:function (options) {

            this.template = Handlebars.compile(htmlTpl);
            _.bindAll(this, 'render', 'remove');
            this.model.bind('destroy', this.remove);
        },
        render:function () {

            var participantProfile;

            if (this.model.get('type') == "Presentation"){
                participantProfile = this.model.get("speaker");
            } else if (this.model.get('type') == "Panel"){
                participantProfile = this.model.get("moderator");
            }

            var content = this.template(participantProfile);

            $(this.el).html(content);

            $(this.el).show(0, function(){
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

    return SpeakerDetailView;
});
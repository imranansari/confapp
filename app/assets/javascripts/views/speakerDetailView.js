define([
    'jquery',
    'livequery',
    'underscore',
    'backbone',
    'handlebars',
    'modelbinding',
    'text!templates/speakerDetail.html'
], function ($, livequery, _, Backbone, handlebars, modelbinding, htmlTpl) {


    var SpeakerDetailView = Backbone.View.extend({

        tagName:"li",

        initialize:function (options) {

            this.template = Handlebars.compile(htmlTpl);
            _.bindAll(this, 'render', 'remove');
            this.model.bind('destroy', this.remove);
        },
        render:function () {

            var participantProfile;
            var panelistId = this.options.panelistId;

            if (this.model.get('type') == "Presentation") {
                participantProfile = this.model.get("speaker");
            } else if ((this.model.get('type') == "Panel" ) && (this.options.panelistId == undefined) ) {
                participantProfile = this.model.get("moderator");
            } else if (panelistId != undefined){
                var panelists = this.model.get("panelists");
                $(panelists).each(function(){
                    if (this.id === panelistId){
                        participantProfile = this;
                    }
                })
            }

            var content = this.template(participantProfile);

            try {
                window.scroll.destroy();
            } catch (e) {
                //fix this later
            }

            window.scroll = new iScroll('wrapper', {
                vScrollbar:false,
                hScrollbar:false,
                hScroll:false,
                useTransform:false,
                onBeforeScrollStart:function (e) {
                    var target = e.target;
                    while (target.nodeType != 1) target = target.parentNode;

                    if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                        e.preventDefault();
                }
            });

            $(this.el).html(content);

            $(this.el).show(0, function () {
                window.scroll.refresh();
            });

            $('.speakerDetail').livequery(function () {
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
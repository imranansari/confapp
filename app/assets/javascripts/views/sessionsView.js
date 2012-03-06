define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'modelbinding',
    'views/sessionView'
], function ($, _, Backbone, handlebars, modelbinding, SessionView) {

    Backbone.ModelBinding = require('modelbinding');


    var SessionsView = Backbone.View.extend({

        tagName:"ul",
        //className : "agenda-icon-list",
        el:$('#agendaList'),

        initialize:function (options) {
            _.bindAll(this, 'render', 'addAll', 'addOne');
            this.collection.bind('add', this.addOne);
        },
        render:function () {
            //$(this.el).html(this.template());
            this.addAll();

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

            $(this.el).show(0, function () {
                window.scroll.refresh();
            });

            return this;
        },
        addAll:function () {
            this.collection.each(this.addOne);
        },
        addOne:function (model) {
            console.log('addOne');
            view = new SessionView({model:model});
            view.render();
            //console.log(view.el);

            $(this.el).prepend(view.el);
            //console.log(view.el);
            model.bind('remove', view.remove);
        }

    });

    return SessionsView;
});
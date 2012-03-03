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

        tagName : "ul",
        //className : "agenda-icon-list",
        el : $('#agendaList'),

        initialize:function (options) {
            _.bindAll(this, 'render', 'addAll', 'addOne');
            this.collection.bind('add', this.addOne);
        },
        render:function () {
            //$(this.el).html(this.template());
            this.addAll();

            $(this.el).show(0, function(){
                window.scroll = new iScroll('wrapper', { vScrollbar:false, hScrollbar:false, hScroll:false });

                window.scroll.refresh();
             });

            return this;
        },
        addAll:function () {
            this.collection.each(this.addOne);
        },
        addOne:function (model) {
            view = new SessionView({model:model});
            view.render();
            //console.log(view.el);

            $(this.el).prepend(view.el);
            model.bind('remove', view.remove);
        }

    });

    return SessionsView;
});
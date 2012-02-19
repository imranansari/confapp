define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'modelbinding',
    'views/questionView'
], function ($, _, Backbone, handlebars, modelbinding, QuestionView) {

    Backbone.ModelBinding = require('modelbinding');

    var QuestionsView = Backbone.View.extend({
        initialize:function (options) {
            _.bindAll(this, 'render', 'addAll', 'addOne');
            this.collection.bind('add', this.addOne);
        },
        render:function () {
            //$(this.el).html(this.template());
            this.addAll();
            return this;
        },
        addAll:function () {
            this.collection.each(this.addOne);
        },
        addOne:function (model) {
            view = new QuestionView({model:model, mode: this.options.mode});
            view.render();
            $(this.el).prepend(view.el);
            model.bind('remove', view.remove);
        }


    });

    return QuestionsView;
});
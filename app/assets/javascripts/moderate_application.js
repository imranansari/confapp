require(["order!jquery",
    "order!livequery",
    "order!rails",
    "order!viewporter",
    "order!handlebars",
    "order!backbone",
    "order!modelbinding",
    "order!bootstrap",
    'views/moderate_app'], function(ModerateQuestionsView){
  var moderateQuestionsView = new ModerateQuestionsView();
});

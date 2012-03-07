require(["order!jquery",
    "order!livequery",
    "order!rails",
    "order!viewporter",
    "order!handlebars",
    "order!backbone",
    "order!modelbinding",
    "order!bootstrap",
    "order!iscroll",
    "views/agendaAppView"
], function (AgendaAppView) {
    var agendaAppView = new AgendaAppView();

    var debugging = false; // or true
    if (typeof console == "undefined") var console = { log: function() {} };
    else if (!debugging || typeof console.log == "undefined") console.log = function() {};
});

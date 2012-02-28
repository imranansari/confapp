require(["order!jquery",
    "order!livequery",
    "order!rails",
    //"order!viewporter",
    "order!handlebars",
    "order!backbone",
    "order!modelbinding",
    "order!bootstrap",
    "order!iscroll"
    ], function () {
    //alert(window.innerHeight);
    //alert($('#wrapper').height());
    var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });
    scroll.refresh();

    $("#speakersButton").click(function(){
        alert('speakers');
    });

    $("#agendaButton").click(function(){
        alert('agenda');
    })
});

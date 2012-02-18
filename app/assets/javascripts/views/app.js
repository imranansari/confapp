getActivitiesFromService = function ($) {
    var data;

    $.ajax({
        url:'/storymap/activity?projectId='+PROJECT_ID,
        type:'GET',
        dataType:'json',
        async:false,
        success:function (dataFromService) {
            data = dataFromService;
        }});
    return data;
};

function zyngaScroller($) {

}
define([
    'jquery',
    'underscore',
    'backbone',
    'models/storyActivity',
    'collections/storyActivities',
    'collections/storyTasks',
    'views/storyActivityView',
    'views/storyActivitiesView',
    'views/storyTasksView',
    'views/newActivityView',
    'views/newTaskView',
    'text!templates/menu.html',
    'livequery'
], function ($, _, Backbone, StoryActivity, StoryActivities, StoryTasks, StoryActivityView, StoryActivitiesView, StoryTasksView, NewActivityView, NewTaskView, menuHtml, livequery) {

    $(document).ready(function () {
        var isTouch = ('createTouch' in document) ? true : false;


        $('.touchable').livequery(function(){
            //alert(isTouch);
            if(isTouch){
              $('.clickable').hide();
              $('.touchable').show();
          } else {
              $('.clickable').show();
              $('.touchable').hide();
          }
        });


        //$("#topmenu").html(menuHtml);

        $("#addActivity").click(function () {

            var storyActivity = new StoryActivity();
            var newActivityView = new NewActivityView({model:storyActivity});
            newActivityView.render();
        });

        /*        $("#searchMenu").click(function () {
         $(this).parent(".dropdown").toggleClass("open");
         })*/


        $('.activityItemMenu').live('touchstart', function () {
            $('.activityItemMenu').popover({trigger:'manual', placement:'bottom', content:$('#example').html()});
            $('.activityItemMenu').not(this).popover('hide');
            $(this).popover('show');
        });

        /*        $("a[rel=popover]")
         .popover()
         .click(function(e) {
         e.preventDefault()
         })*/

        //zyngaScroller($);

        //zynga
        var zyngaStorymapContainer = document.getElementById("zynga-storymap-container");
        var content = document.getElementById("content");

        // Setup Scroller
        // Initialize Scroller
        window.zyngaScroller = new Scroller(render, {

        });

        var rect = zyngaStorymapContainer.getBoundingClientRect();

        window.zyngaScroller.setPosition(rect.left + zyngaStorymapContainer.clientLeft, rect.top + zyngaStorymapContainer.clientTop);
        window.zyngaScroller.setDimensions(zyngaStorymapContainer.clientWidth, zyngaStorymapContainer.clientHeight, content.offsetWidth, content.offsetHeight);
        //scroller.setSnapSize(400, 400);


        // Event Handler

        if ('ontouchstart' in window) {

            zyngaStorymapContainer.addEventListener("touchstart", function (e) {
                // Don't react if initial down happens on a form element

                if (e.target.tagName.match(/input|textarea|select/i)) {
                    return;
                }

                if ($(e.target).hasClass('editActivity') || $(e.target).hasClass('addUserTask') || $(e.target).hasClass('editTask')) {
                    return;
                }

                //$('.activityItemMenu').popover('hide');
                window.zyngaScroller.doTouchStart(e.touches, e.timeStamp);
                e.preventDefault();
            }, false);

            document.addEventListener("touchmove", function (e) {
                $('.activityItemMenu').popover('hide');
                window.zyngaScroller.doTouchMove(e.touches, e.timeStamp);
            }, false);

            document.addEventListener("touchend", function (e) {
                window.zyngaScroller.doTouchEnd(e.timeStamp);
            }, false);

        } else {

            var mousedown = false;

            zyngaStorymapContainer.addEventListener("mousedown", function (e) {
                // Don't react if initial down happens on a form element
                if (e.target.tagName.match(/input|textarea|select/i)) {
                    return;
                }

                window.zyngaScroller.doTouchStart([
                    {
                        pageX:e.pageX,
                        pageY:e.pageY
                    }
                ], e.timeStamp);

                mousedown = true;
            }, false);

            document.addEventListener("mousemove", function (e) {
                if (!mousedown) {
                    return;
                }

                window.zyngaScroller.doTouchMove([
                    {
                        pageX:e.pageX,
                        pageY:e.pageY
                    }
                ], e.timeStamp);

                mousedown = true;
            }, false);

            document.addEventListener("mouseup", function (e) {
                if (!mousedown) {
                    return;
                }

                window.zyngaScroller.doTouchEnd(e.timeStamp);

                mousedown = false;
            }, false);

        }
        var storyActivitiesView = new StoryActivitiesView({ collection:StoryActivities });

        var data = getActivitiesFromService($);

        StoryActivities.add(data);

        $('#storyActivitiesList').html(storyActivitiesView.render().el);
        $('#content').css('width', ($('.storyContainer').size() * $('.storyContainer').width()) + 550 + 'px');

        //scroller.setPosition(rect.left + zyngaStorymapContainer.clientLeft, rect.top + zyngaStorymapContainer.clientTop);
        window.zyngaScroller.setDimensions(zyngaStorymapContainer.clientWidth, zyngaStorymapContainer.clientHeight, content.offsetWidth, content.offsetHeight);

    });

    var AppView = Backbone.View.extend({


    });


    // Content Generator
    /*    	var size = 100;
     var frag = document.createDocumentFragment();
     for (var row=0, rl=content.clientHeight/size; row<rl; row++) {
     for (var cell=0, cl=content.clientWidth/size; cell<cl; cell++) {
     elem = document.createElement("div");
     elem.className = "cell";
     elem.style.backgroundColor = row%2 + cell%2 > 0 ? "#ddd" : "";
     elem.innerHTML = row+","+cell;
     frag.appendChild(elem);
     }
     }
     content.appendChild(frag);*/


    return AppView;
});

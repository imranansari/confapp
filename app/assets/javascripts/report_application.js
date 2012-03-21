$(document).ready(function () {

    $.getJSON('/question.json', function (data) {

        console.log(data);


        $(data).each(function () {
            delete this.id;
            delete this._id;
            delete this.updated_at;
        });

        var dataAsJson = JSON.stringify(data);

        var html = _.jsonreport(dataAsJson);

        $(".jsonreport").html(html);
    });
});
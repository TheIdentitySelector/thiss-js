$(document).ready(function() {
    const Hogan = require("hogan.js");
    const search = Hogan.compile('<a class="institution identityprovider" data-href="{{entity_id}}">\
        <li><div class="d-block"><div class="d-inline-block text-truncate label">{{title}}</div>\
             {{#scopes}}<div class="d-none d-md-inline-block text-truncate label-url">{{scopes}}</div>{{/scopes}}\
             <div class="external float-right"><i class="far fa-external-link"></i></div></div>\
            {{#descr}}<div class="d-none d-sm-block d-md-block d-lg-block searchaux">{{descr}}</div>{{/descr}}\
            <div class="d-none d-sm-block d-md-block d-lg-block searchmatch">Search matched&nbsp;<em>{{matched}}</em></div>\
        </li></a>');
    const saved = Hogan.compile('<a class="institution identityprovider" data-href="{{entity_id}}">\
        <li class="known-inst">\
        <div class="d-block">\
        {{#entity_icon}}\
        <img src="{{entity_icon}}" onError="$(this).attr(\'src\',\'1x1t.png1x1t.png\');" class="d-md-inline-block d-lg-inline-block img-thumbnail rounded-circle logo">\
        {{/entity_icon}}\
        {{^entity_icon}}\
        <svg class="d-md-inline-block d-lg-inline-block logo" width="40" height="40"><circle cx="20" cy="20" r="20" fill="#aeaeae" />\
        <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="12px" font-family="Arial" dy=".3em">{{name_tag}}</text></svg>\
        {{/entity_icon}}\
        <div class="d-inline-block">{{title}}</div>\
        <div class="remove float-right"><i class="far fa-times-circle"></i></div>\
        </div></li></a>');
    let timer = 0;

    $("#searchwidget").on('hidden.bs.collapse',function(event) {
        $("#titlefind").hide();
        $("#titlechoose").show();
        $("#searchwidget").hide();
        $("#resultwidget").hide();
        $("#searchinput").val('');
        $("#add_circle").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    }).on('shown.bs.collapse',function(event) {
        $("#titlefind").show();
        $("#titlechoose").hide();
        $("#searchwidget").show();
        $("#add_circle").removeClass("fa-plus-circle").addClass("fa-minus-circle");
        $("#searchinput").focus();
    });

    $("#ds-search-list").on('show.bs', function(event) {
        $("#wefoundresults").hide();
        $("#count").text(0);
        timer = setTimeout( function () { $("#searching").show(); }, 500);
    });

    $("#ds-search-list").on('hide.bs', function(event) {
        $("#resultwidget").hide();
        $("#searching").hide();
    });

    $("#dsclient").discovery_client({
        render_search_result: function(item) {
            if (timer !== undefined) {
                clearTimeout(timer);
                timer = undefined;
                $("#resultwidget").show();
                $("#searching").hide();
                $("#no_results").hide();
            }
            $("#wefoundresults").show();
            $("#count").text(item.counter);
            return search.render(item);
        },
        render_saved_choice: function(item) {
            return saved.render(item);
        },
        no_results: function() {
            if (timer !== undefined) {
                clearTimeout(timer);
                timer = undefined;
                $("#searching").hide();
            }
            $("#wefoundresults").hide();
            $("#no_results").show();
        },
        after: function(count,elt) {
            if (count == 0) {
                $("#titlefind").show();
                $("#titlechoose").hide();
                $("#searchwidget").show();
                $("#addwidget").hide();
            } else {
                $("#titlefind").hide();
                $("#titlechoose").show();
                $("#searchwidget").hide();
                $("#addwidget").show();
            }
        }
    });
});
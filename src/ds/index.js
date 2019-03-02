require('webpack-icons-installer');
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../assets/ds.css';
import '../assets/ra_1.png';
import '../assets/ra_2.png';
import '../assets/ra_3.png';
import '../assets/ra_4.png';
import '../assets/1x1t.png';
import '../assets/ra_icon_2.png';

const Hogan = require("hogan.js");
$ = require("jquery");

require('../jquery-ds-widget.js');

$(document).ready(function() {
    const search = Hogan.compile('<a class="institution identityprovider" data-href="{{entity_id}}">\
        <li><i class="arrow fa fa-angle-right"></i>   \
             <div class="d-block"><div class="text-truncate label">{{title}}</div>\
             <div class="text-truncate label-url">{{scopes}}</div>\
        </li></a>');
    const saved = Hogan.compile('<a class="institution identityprovider" data-href="{{entity_id}}">\
        <li class="known-inst">\
        <div class="d-block">\
        {{#entity_icon}}\
        <img src="{{entity_icon}}" onError="$(this).attr(\'src\',\'1x1t.png\');" class="d-md-inline-block d-lg-inline-block img-thumbnail rounded-circle logo">\
        {{/entity_icon}}\
        {{^entity_icon}}\
        <svg class="d-md-inline-block d-lg-inline-block logo" width="40" height="40"><circle cx="20" cy="20" r="20" fill="#aeaeae" />\
        <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="12px" font-family="Arial" dy=".3em">{{name_tag}}</text></svg>\
        {{/entity_icon}}\
        <div class="d-inline-block">{{title}}</div>\
        <div class="remove float-right"><i class="fa fa-times-circle"></i></div>\
        </div></li></a>');
    const too_many = Hogan.compile('<li>\
       <div class="type-ahead-alert">\
            <p><span class="bold">{{count}} Matches</span> keep typing to refine your search</p>\
       </div></li>');
    const no_results = Hogan.compile('<li>\
        <div class=" alert mt-3 no-results-alert" role="alert">\
			<h3 class="bold">No matching institutions found</h3>\
                <ul>\
                        <li>Try entering an institution name, abbreviation or your institution email</li>\
                        <li>Try accessing through your library website</li>\
                        <li>Contact your librarian</li>\
                </ul>\
            </div>\
        </li>');
    let timer = null;

    $("#searchwidget").on('hidden.bs.collapse',function(event) {
        console.log("hidden.bs.collapse");
        $("#titlefind").hide();
        $("#titlechoose").show();
        $("#searchwidget").hide();
        $("#resultwidget").hide();
        $("#searchinput").val('');
        $("#add_circle").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    }).on('shown.bs.collapse',function(event) {
        console.log("shown.bs.collapse");
        $("#titlefind").show();
        $("#savedchoices").hide();
        $("#titlechoose").hide();
        $("#searchwidget").show();
        $("#add_circle").removeClass("fa-plus-circle").addClass("fa-minus-circle");
        $("#searchinput").focus();
    });

    $("#ds-search-list").on('show.bs', function(event) {
        console.log("show.bs");
        $("#examples").hide();
        $("#count").text(0);
        timer = setTimeout( function () { $("#searching").show(); }, 500);
    }).on('hide.bs', function(event) {
        console.log("hide.bs");
        $("#resultwidget").hide();
        $('#examples').show();
        $("#searching").hide();
        if (timer) {
            clearTimeout(timer);
        }
    });

    $("#dsclient").discovery_client({
        render_search_result: function(item) {
            console.log("render_search_result");
            if (timer) {
                clearTimeout(timer); timer = null;
            }
            $("#resultwidget").show();
            $("#searching").hide();
            $("#searchalert").hide();
            $('#examples').show();
            $("#count").text(item.counter);
            return search.render(item);
        },
        render_saved_choice: function(item) {
            return saved.render(item);
        },
        too_many_results: function(count) {
            if (timer) {
                clearTimeout(timer); timer = null;
            }
            $("#searching").hide();
            return too_many.render({"count": count});
        },
        no_results: function() {
            if (timer) {
                clearTimeout(timer); timer = null;
            }
            $("#searching").hide();
            return no_results.render();
        },
        after: function(count,elt) {
            $("#count").text(count);
            console.log("after");
            $("#searching").hide();
            if (count == 0) {
                $("#searchalert").hide();
                $("#titlefind").show();
                $("#titlechoose").hide();
                $("#searchwidget").show();
                $("#addwidget").hide();
            } else {
                $("#searchalert").hide();
                $("#titlefind").hide();
                $("#titlechoose").show();
                $("#searchwidget").hide();
                $("#addwidget").show();
            }
        }
    });
});

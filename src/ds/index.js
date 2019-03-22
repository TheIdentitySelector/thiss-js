import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faPen, faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusSquare, faPen, faSearch);
dom.i2svg();

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/fonts.css';
import '../assets/ds.css';
import '../assets/ra_1.png';
import '../assets/ra_2.png';
import '../assets/ra_3.png';
import '../assets/ra_4.png';
import '../assets/1x1t.png';
import '../assets/ra_icon_2.png';

const Hogan = require("hogan.js");

require('../jquery-ds-widget.js');

const search = Hogan.compile(require('!raw-loader!./templates/search.html'));
const saved = Hogan.compile(require('!raw-loader!./templates/saved.html'));
const too_many = Hogan.compile(require('!raw-loader!./templates/too_many.html'));
const no_results = Hogan.compile(require('!raw-loader!./templates/no_results.html'));

$(document).ready(function() {
    let timer = null;

    $("#search").on('hidden.bs.collapse',function(event) {
        $("#choose").toggleClass("d-none");
        $("#search").toggleClass("d-none");
        $("#searchinput").val('');
    }).on('shown.bs.collapse',function(event) {
        $("#choose").toggleClass("d-none");
        $("#search").toggleClass("d-none");
        $("#searchinput").focus();
    });

    $("#ds-search-list").on('show.bs', function(event) {
        timer = setTimeout( function () { $("#searching").show(); }, 500);
    }).on('hide.bs', function(event) {
        $("#searching").hide();
        if (timer) {
            clearTimeout(timer);
        }
    });

    $("#add_button").on('click',function(event) {
        event.preventDefault();
        $("#choose").toggleClass("d-none");
        $("#search").toggleClass("d-none");
    });

    $("#edit_button").on('click',function(event) {
        event.preventDefault();
        $("#choosetools").toggleClass("d-none");
        $("#done_button").toggleClass("d-none").toggleClass("display-block");
        $("#savedchoices").removeClass('choose').addClass('edit');
        $(".institution-text").addClass("item-fade");
        $(".institution-icon").addClass("item-fade");
        $(".institution-select").toggleClass("d-none");
        $(".institution-remove").toggleClass("d-none");
    });

    $("#done_button").on('click',function(event) {
        event.preventDefault();
        $("#done_button").toggleClass("d-none").toggleClass("display-block");
        $("#choosetools").toggleClass("d-none");
        $("#savedchoices").removeClass('edit').addClass('choose');
        $(".institution-text").removeClass("item-fade");
        $(".institution-icon").removeClass("item-fade");
        $(".institution-select").toggleClass("d-none");
        $(".institution-remove").toggleClass("d-none");
    });

    $("#dsclient").discovery_client({
        render_search_result: function(item) {
            console.log("render_search_result");
            if (timer) {
                clearTimeout(timer); timer = null;
            }
            $("#searching").hide();
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
            console.log("after - "+count);
            $("#searching").hide();
            if (count == 0) {
                $("#search").removeClass("d-none");
                $("#choose").addClass("d-none");
                $("#searchinput").focus();
            } else {
                $("#choose").removeClass("d-none");
                $("#search").addClass("d-none");
            }
        }
    }).discovery_client("sp").then(entity => $(".sp_title").text(entity.title))
});

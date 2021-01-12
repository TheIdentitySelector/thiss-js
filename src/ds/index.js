import '../assets/nc.scss';
import '../assets/ds.scss';


import { dom, library, config } from '@fortawesome/fontawesome-svg-core';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons/faAngleRight';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

config.autoReplaceSvg = 'nest';

library.add(faPlusSquare, faPen, faSearch, faAngleRight, faTimes);
dom.watch();

import * as $ from 'jquery';
window.jQuery = $;
window.$ = $;
import 'jquery-ui/ui/widget.js';

const Hogan = require("hogan.js");

//import '@theidentityselector/thiss-jquery-plugin/src/ds-widget.js';
import {PersistenceService} from "@theidentityselector/thiss-ds";
import {DiscoveryService, parse_qs, json_mdq_search} from "@theidentityselector/thiss-ds";
require("./bootstrap-list-filter.src.js");
require("./ds-widget.js");
const learn_more_url = process.env.LEARN_MORE_URL || "https://seamlessaccess.org/about/trust/";
const service_url = process.env.SERVICE_URL || "https://seamlessaccess.org/";
const service_name = process.env.SERVICE_NAME || "SeamlessAccess";

const search = Hogan.compile(require('!raw-loader!./templates/search.html'));
const saved = Hogan.compile(require('!raw-loader!./templates/saved.html'));
const too_many = Hogan.compile(require('!raw-loader!./templates/too_many.html'));
const no_results = Hogan.compile(require('!raw-loader!./templates/no_results.html'));
const learnMoreBanner = Hogan.compile(require('!raw-loader!./templates/learn_more_banner.html'));
const noticeAndConsentActions = Hogan.compile(require('!raw-loader!./templates/notice_and_consent_actions.html'));


$(document).ready(function() {
    let timer = null;

    $('#notice-and-consent-actions').html(noticeAndConsentActions.render({}));
    $('#learn-more-banner').html(learnMoreBanner.render({
        service_url: service_url,
        service_name: service_name,
        learn_more_url: learn_more_url
    }));

    $('#learn-more-trigger, #learn-more-close').on('click', function() {
      $("#learn-more-banner").toggleClass("d-none");
    })

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
        timer = setTimeout( function () { if (timer) { $("#searching").show(); } }, 500);
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
        $("h1.choose").text('Edit institutions');
        $("h2.choose").text('If you don’t want an institution to be remembered on this computer, remove it from the list below.');
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
        $("h1.choose").text('Choose Your Institution');
        $("h2.choose").text('Recent institutions');
        $(".institution-text").removeClass("item-fade");
        $(".institution-icon").removeClass("item-fade");
        $(".institution-select").toggleClass("d-none");
        $(".institution-remove").toggleClass("d-none");
    });

    $("#dsclient").discovery_client({
        mdq: process.env.MDQ_URL,
        persistence: process.env.PERSISTENCE_URL,
        search: process.env.SEARCH_URL,
        context: process.env.DEFAULT_CONTEXT,
        inputfieldselector: "#searchinput",
        render_search_result: function(item) {
            $("#searching").hide();
            if (timer) {
                clearTimeout(timer); timer = null;
            }
            return search.render(item);
        },
        render_saved_choice: function(item) {
            return saved.render(item);
        },
        too_many_results: function(bts, count) {
            if (timer) {
                clearTimeout(timer); timer = null;
            }
            $("#searching").hide();
            let too_many_node = too_many.render({"count": count});
            $('body').on('click', "#showall", function() {  bts.showall() })
            return too_many_node;
        },
        no_results: function() {
            if (timer) {
                clearTimeout(timer); timer = null;
            }
            $("#searching").hide();
            return no_results.render();
        },
        persist: function() {
            console.log($("#rememberThisChoice").is(':checked'));
            return $("#rememberThisChoice").is(':checked');
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

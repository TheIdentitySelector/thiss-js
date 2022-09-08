import '../assets/nc.scss';
import '../assets/ds.scss';

import Localization from '../localization.js'

import { dom, library, config } from '@fortawesome/fontawesome-svg-core';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons/faAngleRight';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

config.autoReplaceSvg = 'nest';

const localization = new Localization();

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
import {json_mdq_get} from "@theidentityselector/thiss-ds/src/discovery";
require("./bootstrap-list-filter.src.js");
require("./ds-widget.js");
const learn_more_url = process.env.LEARN_MORE_URL || "https://seamlessaccess.org/about/trust/";
const service_url = process.env.SERVICE_URL || "https://seamlessaccess.org/";
const service_name = process.env.SERVICE_NAME || "SeamlessAccess";
const item_ttl = parseInt(process.env.ITEM_TTL || "3600") * 1000;

const search = Hogan.compile(require('!raw-loader!./templates/search.html'));
const saved = Hogan.compile(require('!raw-loader!./templates/saved.html'));
const too_many = Hogan.compile(require('!raw-loader!./templates/too_many.html'));
const no_results = Hogan.compile(require('!raw-loader!./templates/no_results.html'));
const learnMoreBanner = Hogan.compile(require('!raw-loader!./templates/learn_more_banner.html'));
const noticeAndConsentActions = Hogan.compile(require('!raw-loader!./templates/notice_and_consent_actions.html'));


$(document).ready(function() {
    let timer = null;

    function updateVoiceOverLiveRegion(caption, body) {
        console.log('updateVoiceOverLiveRegion: ', caption)

        setTimeout(function() {
            if ($("#searchinput").val().length > 0) {
                $("#voice-over-live-region > figcaption").text(caption)
                $("#voice-over-live-region > p").text(body)
            } else {
                $("#voice-over-live-region > figcaption").text("")
                $("#voice-over-live-region > p").text("")
            }
        }, 1000)
    }

    function delayedNumberOfResults() {
        setTimeout(function() {
            const count = $("#ds-search-list a").length
            updateVoiceOverLiveRegion("Number of search results.", count)
        }, 1000)
    }

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
        $("#choosetools").toggleClass("d-none");
        $("#done_button").toggleClass("d-none").toggleClass("display-block");
        $("#savedchoices").removeClass('choose').addClass('edit');
        $("#choose > span.choose").hide();
        $("#choose > span.edit").show();
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
        $("#choose > span.edit").hide();
        $("#choose > span.choose").show();
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
            delayedNumberOfResults()
            return search.render(item);
        },
        render_saved_choice: function(item) {
            return saved.render(item);
        },
        too_many_results: function(bts, count) {
            updateVoiceOverLiveRegion("Too many results.", "")

            if (timer) {
                clearTimeout(timer); timer = null;
            }
            $("#searching").hide();
            let too_many_node = too_many.render({
                    "count": count,
                    "matchesString": localization.translateString('ds-too-many-result-matches'),
                    "keepTypingString": localization.translateString('ds-too-many-result-keep-typing'),
                    "showAnywayString": localization.translateString('ds-too-many-result-show')
                });
            $('body').on('click', "#showall", function() {  bts.showall() })
            return too_many_node;
        },
        no_results: function() {
            updateVoiceOverLiveRegion("There were no results.", "")

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
        before: function(items) {
            updateVoiceOverLiveRegion("Searching for results.", "")

            let now = Date.now();
            let o = this;
            return Promise.all(items.map(item => {
                console.log(item)
                console.log(item_ttl)
                console.log(item.last_refresh + item_ttl - now)
                if (item.last_refresh + item_ttl < now) {
                    console.log("refresh ...")
                    return json_mdq_get(encodeURIComponent(item.entity.id), o.mdq).then(entity => {
                        console.log("... found entity on refresh")
                        item.entity = entity;
                        item.modified = true;
                        item.last_refresh = now;
                        item.last_use = now;
                        return item;
                    })
                } else {
                    return Promise.resolve(item)
                }
            })).then(items => items.filter(item => item.entity != undefined))
        },
        after: function(count,elt) {
            console.log("after - "+count);

            updateVoiceOverLiveRegion("Number of search results.", count)

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

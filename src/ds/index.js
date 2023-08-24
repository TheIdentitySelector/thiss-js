import '../assets/nc.scss';
import '../assets/nc.scss';
import '../assets/ds.scss';
import 'core-js/actual';
let headerLogo = require('../assets/sa-black.svg')
let footerLogo = require('../assets/SeamlessFooterLogo.svg')

import Localization from '../localization.js'

import { dom, library, config } from '@fortawesome/fontawesome-svg-core';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons/faAngleRight';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

import searchHTML from './templates/search.html'
import savedHTML from './templates/saved.html'
import tooManyHTML from './templates/too_many.html'
import noResultsHTML from './templates/no_results.html'

config.autoReplaceSvg = 'nest';

const localization = new Localization();

library.add(faPlusSquare, faPen, faSearch, faAngleRight, faTimes);
dom.watch();

import * as $ from 'jquery';
window.jQuery = $;
window.$ = $;
import 'jquery-ui/ui/widget.js';
import 'ejs/ejs.min';

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

// const search = Hogan.compile(require('!raw-loader!./templates/search.html'));
const saved = Hogan.compile(require('!raw-loader!./templates/saved.html'));
const too_many = Hogan.compile(require('!raw-loader!./templates/too_many.html'));
const no_results = Hogan.compile(require('!raw-loader!./templates/no_results.html'));
// const learnMoreBanner = Hogan.compile(require('!raw-loader!./templates/learn_more_banner.html'));
// const noticeAndConsentActions = Hogan.compile(require('!raw-loader!./templates/notice_and_consent_actions.html'));


$(document).ready(function() {
    let timer = null;

    $("#ra-21-logo").attr("src", headerLogo.split(" = ")[1].replace(/'/g,""));
    $("#seamlessaccess_footer_logo").attr("src", footerLogo.split(" = ")[1].replace(/'/g,""));

/*    $('#notice-and-consent-actions').html(noticeAndConsentActions.render({}));
    $('#learn-more-banner').html(learnMoreBanner.render({
        service_url: service_url,
        service_name: service_name,
        learn_more_url: learn_more_url
    }));*/

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
        console.log('event: ', event)
        timer = setTimeout( function () { if (timer) { console.log('searching'); $("#searching").removeClass('d-none') } }, 500);
    }).on('hide.bs', function(event) {
        $("#searching").addClass('d-none');

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
        render_search_result: function(items) {
            console.log('render_search_result items: ', items)
            $("#searching").addClass('d-none');

            if (timer) {
                clearTimeout(timer); timer = null;
            }

            let htmlItemList = []

            items.forEach((item) => {
                let html = ejs.render(searchHTML, {
                    title: item.title,
                    domain: item.domain,
                    entity_id: item.entity_id
                })

                htmlItemList.push(html)
            })

            $("#ds-search-list").html(htmlItemList);

        },
        render_saved_choice: function(items) {
            console.log('render_saved_choice')

            $("#searching").addClass('d-none');

            if (timer) {
                clearTimeout(timer); timer = null;
            }

            items.forEach((item) => {
                let html = ejs.render(savedHTML, {
                    title: item.title,
                    domain: item.domain,
                    entity_id: item.entity_id,
                    entity_icon: item.entity_icon,
                    name_tag: item.name_tag,
                    entity_icon_url: item.entity_icon_url
                })

                $("#ds-saved-choices").append(html);
            })
        },
        too_many_results: function(bts, count) {
            console.log('too_many_results')

            $("#searching").addClass('d-none');

            if (timer) {
                clearTimeout(timer); timer = null;
            }

            let html = ejs.render(tooManyHTML, {
                count: count,
                matchesString: localization.translateString('ds-too-many-result-matches'),
                keepTypingString: localization.translateString('ds-too-many-result-keep-typing'),
                showAnywayString: localization.translateString('ds-too-many-result-show')
            })

            $("#ds-search-list").append(html);
        },
        no_results: function() {
            console.log('no_results')

            $("#searching").addClass('d-none');

            if (timer) {
                clearTimeout(timer); timer = null;
            }
            return no_results.render();
        },
        persist: function() {
            console.log($("#rememberThisChoice").is(':checked'));
            return $("#rememberThisChoice").is(':checked');
        },
        before: function(items) {
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
            $("#searching").addClass('d-none');
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

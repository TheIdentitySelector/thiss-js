import '../assets/nc.scss';
import '../assets/nc.scss';
import '../assets/ds.scss';
import 'core-js/actual';
import headerLogo from '../assets/sa-black.svg';
import footerLogo from '../assets/SeamlessFooterLogo.svg';

import Localization from '../localization.js'

import { dom, library, config } from '@fortawesome/fontawesome-svg-core';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons/faAngleRight';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

import searchHTML from './templates/search.html'
import savedHTML from './templates/saved.html'
import tooManyHTML from './templates/too_many.html'
import noResultsHTML from './templates/no_results.html'
import filterWarningHTML from './templates/filter_warning.html'

config.autoReplaceSvg = 'nest';

const localization = new Localization();

library.add(faPlusSquare, faPen, faAngleRight, faTimes, faExclamationTriangle, faCheckCircle, faMagnifyingGlass);
dom.watch();

import * as $ from 'jquery';
window.jQuery = $;
window.$ = $;
import 'jquery-ui/ui/widget.js';
import 'ejs/ejs.min';

//import '@theidentityselector/thiss-jquery-plugin/src/ds-widget.js';
import {json_mdq_get, json_mdq_get_sp} from "@theidentityselector/thiss-ds/src/discovery.js";
require("./bootstrap-list-filter.src.js");
require("./ds-widget.js");
const learn_more_url = process.env.LEARN_MORE_URL || "https://seamlessaccess.org/about/trust/";
const service_url = process.env.SERVICE_URL || "https://seamlessaccess.org/";
const service_name = process.env.SERVICE_NAME || "SeamlessAccess";
const item_ttl = parseInt(process.env.ITEM_TTL || "3600") * 1000;
const mdq_url = process.env.MDQ_URL || "https://md.seamlessaccess.org/entities";


$(document).ready(function() {
    let timer = null;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let entityID = null
    let trustProfile = null
    let trustProfileExists = false

    if (urlParams.has('entityID'))
        entityID = urlParams.get('entityID')

    if (urlParams.has('trustProfile'))
        trustProfile = urlParams.get('trustProfile')
        trustProfileExists = true

/*
    $("#ra-21-logo").attr("src", headerLogo);
    $("#seamlessaccess_footer_logo").attr("src", footerLogo);
    $("#ra-21-logo").attr("src", headerLogo.split(" = ")[1].replace(/'/g,"").replace(/"/g,""));
    $("#seamlessaccess_footer_logo").attr("src", footerLogo.split(" = ")[1].replace(/'/g,"").replace(/"/g,""));
*/
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
        timer = setTimeout( function () { if (timer) { console.log('searching'); $("#searching").removeClass('d-none') } }, 2500);
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
        $(".warning-banner").toggleClass("d-none");
        $("#done_button").toggleClass("d-none").toggleClass("display-block");
        $("#savedchoices").removeClass('choose').addClass('edit');
        $("#choose > span.choose").toggleClass("d-none");
        $("#choose > span.edit").toggleClass("d-none");
        $(".institution-text").addClass("item-fade");
        $(".institution-icon").addClass("item-fade");
        $(".institution-select").toggleClass("d-none");
        $(".institution-remove").toggleClass("d-none");
    });

    $("#done_button").on('click',function(event) {
        event.preventDefault();
        $("#done_button").toggleClass("d-none").toggleClass("display-block");
        $("#choosetools").toggleClass("d-none");
        $(".warning-banner").toggleClass("d-none");
        $("#savedchoices").removeClass('edit').addClass('choose');
        $("#choose > span.edit").toggleClass("d-none");
        $("#choose > span.choose").toggleClass("d-none");
        $(".institution-text").removeClass("item-fade");
        $(".institution-icon").removeClass("item-fade");
        $(".institution-select").toggleClass("d-none");
        $(".institution-remove").toggleClass("d-none");
    });

    $("#discovery-response-warning-header-link").on('click',function(event) {
        event.preventDefault();
        const visibleChild = $("#dsclient").children().not(".d-none")[0];
        $("#dsclient").addClass('d-none');
        $("#discovery-response-warning").removeClass("d-none");
        let back;
        if ($(visibleChild).attr("id") === "choose") {
            back = localization.translateString('filter-warning-back-to-choose');
        } else if ($(visibleChild).attr("id") === "search") {
            back = localization.translateString('filter-warning-no-search');
        }
        $("#warning-done-button").text(back);
    });

    $("#warning-done-button").on('click',function(event) {
        event.preventDefault();
        $("#dsclient").removeClass('d-none');
        $("#discovery-response-warning").addClass("d-none");
    });

    $("#dsclient").discovery_client({
        mdq: mdq_url,
        persistence: process.env.PERSISTENCE_URL,
        search: process.env.SEARCH_URL,
        entityID: entityID,
        trustProfile: trustProfile,
        context: process.env.DEFAULT_CONTEXT,
        inputfieldselector: "#searchinput",
        _render_search_result: function(items, strict, spEntity) {

            let browserLanguage = window.navigator.language
            browserLanguage = (browserLanguage.split('-'))[0]
    
            let htmlItemList = []

            const templ = ejs.compile(searchHTML);

            items.forEach((item) => {
                let hint = false;

                if (!strict && 'hint' in item) {
                    hint = true;
                }
                const context = {
                    title: item.title,
                    domain: item.domain,
                    entity_id: item.entity_id,
                    strictProfile: strict,
                    hint: hint,
                };
                const html = templ(context);

                htmlItemList.push(html)
            })

            if (items) {
                if (items.length > 0) {
                    if (items[0].hasOwnProperty('counter')) {
                        if (items[0].counter > 1) {
                            $("#ds-search-list").append(htmlItemList);
                        } else {
                            $("#ds-search-list").html(htmlItemList);
                        }
                    } else {
                        $("#ds-search-list").html(htmlItemList);
                    }
                }
            }
        },
        render_search_result: function(items) {
            if (trustProfile && !trustProfileExists)
                return this.no_results();

            const self = this;
            $("#searching").addClass('d-none');

            if (timer) {
                clearTimeout(timer); timer = null;
            }

            json_mdq_get_sp(entityID, mdq_url).then(spEntity => {
                let strict = true;
                if (trustProfile && 'tinfo' in spEntity && 
                          'profiles' in spEntity.tinfo &&
                           trustProfile in spEntity.tinfo.profiles)
                    strict = spEntity.tinfo.profiles[trustProfile].strict;

                self._render_search_result(items, strict, spEntity);
            }).catch(err => {
                self._render_search_result(items, true, null);
            });
        },
        _render_saved_choice: function(items, strict, spEntity) {

            let browserLanguage = window.navigator.language;
            browserLanguage = (browserLanguage.split('-'))[0];

            let hasNonHinted = false;

            const templ = ejs.compile(savedHTML);
            items.forEach((item) => {
                let hint = false;
                if (strict === false && 'hint' in item) {
                    hint = true;
                }
                if (!hint) hasNonHinted = true;

                const context = {
                    title: item.title,
                    domain: item.domain,
                    entity_id: item.entity_id,
                    entity_icon: item.entity_icon,
                    name_tag: item.name_tag,
                    strictProfile: strict,
                    hint: hint,
                    entity_icon_url: item.entity_icon_url
                };
                const html = templ(context);

                $("#ds-saved-choices").append(html);
            })

            if (strict === false && hasNonHinted) {
                let org = spEntity.title;
                if (spEntity.title_langs && spEntity.title_langs[browserLanguage]) {
                    org = spEntity.title_langs[browserLanguage];
                }
                const no_access = localization.translateString('filter-warning-no-access');
                const choose_alternative = localization.translateString('filter-warning-choose-alternative');
                const other_access = localization.translateString('filter-warning-other-options');
                let html = ejs.render(filterWarningHTML, {
                    organization: org,
                    filter_warning_no_access: no_access,
                    choose_alternative: choose_alternative,
                    other_access: other_access,
                })

                $("#filter-warning").append(html);
            }
        },
        render_saved_choice: function(items) {
            const self = this;
            $("#searching").addClass('d-none');

            if (timer) {
                clearTimeout(timer); timer = null;
            }

            trustProfileExists = false;
            json_mdq_get_sp(entityID, mdq_url).then(spEntity => {
                let strict = true;
                if (trustProfile && 'tinfo' in spEntity && 
                          'profiles' in spEntity.tinfo &&
                           trustProfile in spEntity.tinfo.profiles) {
                    strict = spEntity.tinfo.profiles[trustProfile].strict;
                    trustProfileExists = true;
                } else {
                    if (trustProfile)
                        trustProfileExists = false;
                }
                
                self._render_saved_choice(items, strict, spEntity);
            }).catch(err => {
                self._render_saved_choice(items, true, null);
            });
        },
        too_many_results: function(bts, count) {
            if (trustProfile && !trustProfileExists)
                return this.no_results();

            $("#searching").addClass('d-none');
            document.getElementById('ds-search-list').innerHTML = ''

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
            $("#searching").addClass('d-none');
            document.getElementById('ds-search-list').innerHTML = ''

            if (timer) {
                clearTimeout(timer); timer = null;
            }

            let html = ejs.render(noResultsHTML)

            $("#ds-search-list").append(html);
        },
        persist: function() {
            return $("#rememberThisChoice").is(':checked');
        },
        before: function(items) {
            let now = Date.now();
            let o = this;
            return Promise.all(items.map(item => {
                console.log("refresh ...")
                return json_mdq_get(encodeURIComponent(item.entity.id), trustProfile, entityID, o.mdq).then(entity => {
                    console.log("... found entity on refresh")
                    item.entity = entity;
                    item.modified = true;
                    item.last_refresh = now;
                    item.last_use = now;
                    return item;
                }).catch(err => {
                    console.log("... did not find entity on refresh")
                })
            })).then(items => items.filter(item => item && item.entity !== undefined))
               .catch(err => []);
        },
        after: function(count,elt) {
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
    }).discovery_client("sp").then(entity => {
        $(".sp_title").text(entity.title);
        $("#discovery-response-warning-site").text(entity.title);

        let goodReturn = false;

        if (entity.discovery_responses) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            let returnUrl = null;
            if (urlParams.has('return'))
                returnUrl = urlParams.get('return')

            entity.discovery_responses.forEach(dr => {
                if (returnUrl !== null && returnUrl.startsWith(dr)) {
                    goodReturn = true;
                }
            });
        }
        if (goodReturn === false) {
            $("#warning-discovery-response").removeClass("d-none");
        }
    })
});

import '../assets/nc.scss';
import '../assets/nc.scss';
import '../assets/ds.scss';
import '../assets/tooltip.scss';
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
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons/faCircleInfo';

import searchHTML from './templates/search.html'
import savedHTML from './templates/saved.html'
import tooManyHTML from './templates/too_many.html'
import noResultsHTML from './templates/no_results.html'
import filterWarningHTML from './templates/filter_warning.html'

import {translatable} from "./translatableAttributes.js";

config.autoReplaceSvg = 'nest';

const localization = new Localization();

library.add(faPlusSquare, faPen, faAngleRight, faTimes, faExclamationTriangle, faCheckCircle, faMagnifyingGlass, faCircleInfo);
dom.watch();

import * as $ from 'jquery';
window.jQuery = $;
window.$ = $;
import 'jquery-ui/ui/widget.js';
import 'ejs/ejs.min';

//import '@theidentityselector/thiss-jquery-plugin/src/ds-widget.js';
import {json_mdq, json_mdq_pre_get, json_mdq_get, json_mdq_get_sp} from "@theidentityselector/thiss-ds/src/discovery.js";
import hex_sha1 from "@theidentityselector/thiss-ds/src/sha1.js";
import {showSuggested} from "./suggested.js";
require("./bootstrap-list-filter.src.js");
require("./ds-widget.js");
const learn_more_url = process.env.LEARN_MORE_URL || "https://seamlessaccess.org/about/trust/";
const service_url = process.env.SERVICE_URL || "https://seamlessaccess.org/";
const service_name = process.env.SERVICE_NAME || "SeamlessAccess";
const item_ttl = parseInt(process.env.ITEM_TTL || "3600") * 1000;
const mdq_url = process.env.MDQ_URL || "https://md.seamlessaccess.org/entities/";


function _sha1_id(s) {
    return encodeURIComponent("{sha1}"+hex_sha1(s));
}

const adjustHeader = () => {
    const widthLogos = $('#sa-logos').width();
    const widthAccessTo = $('#sa-access-to').width();
    const widthHeader = $('header').width();
    const headerPaddingLeft = parseInt($('header').css('padding-left'));

    if (widthHeader > ((2 * widthLogos) + widthAccessTo + headerPaddingLeft)) {
        $('#header-empty-right').width(widthLogos + headerPaddingLeft);
    } else {
        $('#header-empty-right').addClass("d-none");
        $('#sa-access-to').css('padding-right', `${headerPaddingLeft}px`);
    }
};

export const showNotice = (content, level, timeout) => {
    const notice = $('#sa-notice-header');
    if (level === 'success') {
        notice.css('background-color', '#d1e7dd');
        notice.css('color', '#0f5132');
        notice.css('border', '1px solid #badbcc');
    } else if (level === 'info') {
        notice.css('background-color', '#cff4fc');
        notice.css('color', '#055160');
        notice.css('border', '1px solid #b6effb');
    } else if (level === 'warning') {
        notice.css('background-color', '#fff3cd');
        notice.css('color', '#664d03');
        notice.css('border', '1px solid #ffecb5');
    } else if (level === 'danger') {
        notice.css('background-color', '#f8d7da');
        notice.css('color', '#842029');
        notice.css('border', '1px solid #f5c2c7');
    }
    if (Array.isArray(content)) {
        notice.html('');
        content.forEach(e => {
            notice.append(e);
        });
    } else {
        notice.html(content);
    }
    notice.css('visibility', 'visible');
    if (Number.isInteger(timeout)) {
        setTimeout(() => {
            hideNotice();
        }, timeout);
    }
}
export const hideNotice = () => {
    $('#sa-notice-header').html('');
    $('#sa-notice-header').css('visibility', 'hidden');
}


$(document).ready(function() {
    let timer = null;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let entityID = null;
    let trustProfile = null;
    let showLogo = false;
    let warnDR = false;

    if (urlParams.has('entityID'))
        entityID = urlParams.get('entityID')

    if (urlParams.has('trustProfile'))
        trustProfile = urlParams.get('trustProfile')

    if (urlParams.has('showLogo')) {
        if (urlParams.get('showLogo') === 'true')
            showLogo = true;
    }

    if (urlParams.has('warnDR')) {
        if (urlParams.get('warnDR') === 'true')
            warnDR = true;
    }

    // Advanced integrations embedding the DS in their own page (e.g. in an
    // iframe) pass embedded=true to hide the SA header/footer chrome — the
    // functional box is unchanged. Styling lives under body.embedded in
    // ds.scss.
    if (urlParams.has('embedded')) {
        if (urlParams.get('embedded') === 'true')
            $('body').addClass('embedded');
    }

    // The upgrade-test harness points the DS at a specific persistence
    // service generation (/ps/ vs /new/ps/). Only same-origin targets are
    // accepted, so a crafted link cannot redirect persistence elsewhere.
    let persistence = process.env.PERSISTENCE_URL;
    if (urlParams.has('psUrl')) {
        try {
            const psOverride = new URL(urlParams.get('psUrl'), window.location.href);
            if (psOverride.origin === window.location.origin)
                persistence = psOverride.href;
        } catch (err) {
        }
    }

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

    let lang = 'en';

    if (localization && localization.locale) {
        document.documentElement.setAttribute('lang', localization.locale);

        lang = localization.locale;
        lang = (lang.split('-'))[0];
    }

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
        showSuggested();
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
        if ( $('#ds-saved-choices').children().length !== 0) {
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
        } else {
            $("#choose").toggleClass("d-none");
            $("#search").toggleClass("d-none");
            showSuggested();
        }
    });

    $("#warning-done-button").on('click',function(event) {
        event.preventDefault();
        $("#dsclient").removeClass('d-none');
        $("#discovery-response-warning").addClass("d-none");
    });

    $(window).on('resize', function(event) {
        adjustHeader();
    });

    translatable.forEach(tr => {
        localization.translateStringP(tr[0]).then(val => {
            $(tr[1]).attr(tr[2], val);
        });
    });

    $("#dsclient").discovery_client({
        mdq: mdq_url,
        persistence: persistence,
        search: process.env.SEARCH_URL,
        entityID: entityID,
        trustProfile: trustProfile,
        context: process.env.DEFAULT_CONTEXT,
        inputfieldselector: "#searchinput",
        _render_search_result: function(items, strict, spEntity) {
    
            let htmlItemList = []

            const templ = ejs.compile(searchHTML);

            items.forEach((item) => {

                localization.updateDynamic(item);

                let hint = false;

                if (!strict && 'hint' in item) {
                    hint = true;
                }
                const title_i18n = item.entityID;
                let title = item.title;

                if ('title_langs' in item && lang in item.title_langs) {
                    title = item.title_langs[lang];
                }
                const context = {
                    title: title,
                    title_i18n: title_i18n,
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
                            $("#ds-search-header").html('');
                            $("#ds-search-list").html(htmlItemList);
                        }
                    } else {
                        $("#ds-search-header").html('');
                        $("#ds-search-list").html(htmlItemList);
                    }
                    // Announce only the number of matches via the live region;
                    // the list itself is outside it (issue #309).
                    const shown = $("#ds-search-list li").length;
                    $("#ds-search-count").text(
                        localization.translateString('ds-search-results-shown', shown));
                }
            }
        },
        render_search_result: function(items) {
            const self = this;
            $("#searching").addClass('d-none');

            if (timer) {
                clearTimeout(timer); timer = null;
            }

            try {
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
            } catch (err) {
                self._render_search_result(items, true, null);
            }
        },
        _render_saved_choice: function(items, strict, spEntity) {

            let lang = localization.locale;
            lang = (lang.split('-'))[0];

            let hasNonHinted = false;

            const templ = ejs.compile(savedHTML);
            let itemCount = 0;
            items.forEach((item) => {

                if (item.hidden !== true && item.hidden !== "true") {

                    localization.updateDynamic(item);

                    let hint = false;
                    if (strict === false && 'hint' in item) {
                        hint = true;
                    }
                    if (!hint) hasNonHinted = true;

                    const title_i18n = item.entityID;
                    let title = item.title;
                    if ('title_langs' in item && lang in item.title_langs) {
                        title = item.title_langs[lang];
                    }

                    // Name the institution in the remove button's aria-label
                    // (issue #309). Fall back to English if the locale file
                    // is not loaded yet.
                    let remove_label = localization.translateString('aria-label-remove-institute', title);
                    if (!remove_label || remove_label === 'aria-label-remove-institute')
                        remove_label = 'Remove ' + title + ' from remembered institutions';

                    const context = {
                        title: title,
                        title_i18n: title_i18n,
                        domain: item.domain,
                        entity_id: item.entity_id,
                        entity_icon: item.entity_icon,
                        name_tag: item.name_tag,
                        strictProfile: strict,
                        hint: hint,
                        entity_icon_url: item.entity_icon_url,
                        remove_label: remove_label
                    };
                    const html = templ(context);

                    $("#ds-saved-choices").append(html);
                    itemCount += 1;
                }
            })

            if (itemCount > 0) {
                showSuggested();
            }

            if (strict === false && hasNonHinted) {
                let org = spEntity.title;
                if (spEntity.title_langs && spEntity.title_langs[lang]) {
                    org = spEntity.title_langs[lang];
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

            if (entityID) {
                json_mdq_get_sp(entityID, mdq_url).then(spEntity => {
                    let strict = true;
                    if (trustProfile && 'tinfo' in spEntity && 
                              'profiles' in spEntity.tinfo &&
                               trustProfile in spEntity.tinfo.profiles) {
                        strict = spEntity.tinfo.profiles[trustProfile].strict;
                    }
                    
                    self._render_saved_choice(items, strict, spEntity);
                }).catch(err => {
                    self._render_saved_choice(items, true, null);
                });
            }
        },
        too_many_results: function(bts, count) {
            $("#searching").addClass('d-none');
            document.getElementById('ds-search-list').innerHTML = ''
            $("#ds-search-header").html('');
            $("#ds-search-count").html('');

            if (timer) {
                clearTimeout(timer); timer = null;
            }

            let html = ejs.render(tooManyHTML, {
                count: count,
                matchesString: localization.translateString('ds-too-many-result-matches'),
                keepTypingString: localization.translateString('ds-too-many-result-keep-typing'),
                showAnywayString: localization.translateString('ds-too-many-result-show')
            })

            $("#ds-search-header").append(html);
        },
        no_results: function() {
            $("#searching").addClass('d-none');
            document.getElementById('ds-search-list').innerHTML = ''
            $("#ds-search-header").html('');
            $("#ds-search-count").html('');

            if (timer) {
                clearTimeout(timer); timer = null;
            }

            let html = ejs.render(noResultsHTML)

            $("#ds-search-header").append(html);
        },
        persist: function() {
            return $("#rememberThisChoice").is(':checked');
        },
        before: function(items) {
            let now = Date.now();
            let o = this;
            return Promise.all(items.map(item => {
                return json_mdq_pre_get(`{sha1}${hex_sha1(item.entity.entityID)}`, trustProfile, entityID, o.mdq).then(entity => {
                    item.entity = entity;
                    item.modified = true;
                    item.last_refresh = now;
                    item.last_use = now;
                    return item;
                }).catch(err => {
                    console.log(`Error refreshing entity: ${err}`)
                })
            })).then(items => items.filter(item => item && item.entity !== undefined))
               .catch(err => {
                    console.log(`Error filtering entities: ${err}`)
               });
        },
        after: function(count,elt) {
            $("#searching").addClass('d-none');
            if (count == 0) {
                $("#search").removeClass("d-none");
                $("#choose").addClass("d-none");
                $("#searchinput").focus();
                showSuggested();
            } else {
                $("#choose").removeClass("d-none");
                $("#search").addClass("d-none");
            }
        }
    }).discovery_client("sp").then(entity => {
        let spTitle = entity.title;
        if ('title_langs' in entity && lang in entity.title_langs) {
            spTitle = entity.title_langs[lang];
        }
        $(".sp_title").text(spTitle);
        localization.translateStringP('ds-header').then(val => {
          $(".header-sp-title").text(`${val} ${spTitle}`);
        });
        $("#discovery-response-warning-site").text(spTitle);

        let goodReturn = !warnDR;

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
        } else {
            goodReturn = true;
        }
        if (goodReturn === false) {
            const iElem = $('<i>');
            iElem.addClass('fa');
            iElem.addClass('fa-exclamation-triangle');
            iElem.addClass('warning-fa-item');
            const aElem = $('<a>');
            aElem.attr('id', 'notice-header-link');
            aElem.attr('href', '#');
            aElem.attr('data-i18n', 'ds-unable-to-verify-return');
            aElem.text('Unable to verify returning website');

            aElem.on('click',function(event) {
                event.preventDefault();
                $("#dsclient").addClass('d-none');
                $("#discovery-response-warning").removeClass("d-none");
            });
            showNotice([iElem, aElem], 'warning');
        }
        if (entity.entity_icon_url !== undefined && showLogo) {
            $("#ra-21-logo-other").attr('src', entity.entity_icon_url.url);
            $("#ra-21-logo-other").attr('width', entity.entity_icon_url.width);
            $("#ra-21-logo-other").attr('height', entity.entity_icon_url.height);
            $("#ra-21-logo-other").removeClass("d-none");
            $("#header-logo-separator").removeClass("d-none");
        }
        adjustHeader();
    })
});

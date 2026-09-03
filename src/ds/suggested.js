import * as $ from 'jquery';
window.jQuery = $;
window.$ = $;
import 'ejs/ejs.min';

//import '@theidentityselector/thiss-jquery-plugin/src/ds-widget.js';
import {json_mdq, json_mdq_get_sp} from "@theidentityselector/thiss-ds/src/discovery.js";
import hex_sha1 from "@theidentityselector/thiss-ds/src/sha1.js";
const mdq_url = process.env.MDQ_URL || "https://md.seamlessaccess.org/entities/";
import suggestedHeaderHTML from './templates/suggested_header.html'
import suggestedHTML from './templates/suggested.html'
import tooltipHTML from './templates/tooltip.html'
import Localization from '../localization.js'

const max_suggested_raw = Number.parseInt(process.env.MAX_SUGGESTED);
let max_suggested;
if (Number.isInteger(max_suggested_raw)) {
  max_suggested = max_suggested_raw;
} else {
  max_suggested = 5;
}

const localization = new Localization();


function _sha1_id(s) {
    return encodeURIComponent("{sha1}"+hex_sha1(s));
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let entityID = null;
let suggested = [];

if (urlParams.has('entityID'))
    entityID = urlParams.get('entityID')

if (urlParams.has('suggested')) {
    const paramSuggested = urlParams.get('suggested');
    const csSuggested = decodeURIComponent(paramSuggested);
    suggested = csSuggested.split(',').map(s => s.trim());
    if (suggested.length > max_suggested) {
        suggested = suggested.slice(0, max_suggested);
    }
}

export const showSuggested = () => {
   const howmany = suggested.length;
   if (howmany > 0) {
       const suggestedTempl = ejs.compile(suggestedHTML);
       let lang = localization.locale;
       lang = (lang.split('-'))[0];
       $("#searching").addClass('d-none');
       document.getElementById('ds-search-list').innerHTML = ''
        $("#ds-search-header").html('');
        $("#ds-search-count").html('');
       const headerHtml = ejs.render(suggestedHeaderHTML, {
           suggestedString: localization.translateString('suggested-institutions-header')
       });
       let firstSuggested = true;
       const spPromise = json_mdq_get_sp(entityID, mdq_url);
       const htmls = [];
       suggested.forEach((eid, idx) => {
           const id = _sha1_id(eid);
           const url = mdq_url + id + ".json"

           json_mdq(url).then(function(item) {
               if (Array.isArray(item)) {
                   item = item[0];
               }

               if (item.hidden !== true && item.hidden !== "true") {

                   localization.updateDynamic(item);

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
                       name_tag: item.name_tag,
                       remove_label: remove_label,
                   };
                   const html = suggestedTempl(context);

                   if (firstSuggested) {
                       firstSuggested = false;
                       spPromise.then(spEntity => {
                           const spEntityTitle = spEntity.title ? spEntity.title : entityID;
                           const tooltipHtml = ejs.render(tooltipHTML, {
                               tooltipId: 'suggested-tooltip',
                               tooltipData: spEntityTitle,
                               tooltipTitle: localization.translateString('suggested-tooltip-title', spEntityTitle),
                               tooltipText: localization.translateString('suggested-tooltip-text', spEntityTitle)
                           });
                           $("#ds-search-header").html(headerHtml);
                           $("#suggested-tooltip-container").append(tooltipHtml);
                       });
                   }
                   htmls.push([idx, html]);

                   if (htmls.length === howmany) {
                      htmls.sort((h1, h2) => h1[0] - h2[0]);
                      htmls.forEach(h => {
                        $("#ds-search-list").append(h[1]);
                      });
                   }
               }
           }).catch(function(error) {
               console.log("ERROR getting suggested entity:", error);
           });
       });
   }
};

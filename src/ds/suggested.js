import * as $ from 'jquery';
window.jQuery = $;
window.$ = $;

//import '@theidentityselector/thiss-jquery-plugin/src/ds-widget.js';
import {json_mdq, json_mdq_get_sp} from "@theidentityselector/thiss-ds/src/discovery.js";
import hex_sha1 from "@theidentityselector/thiss-ds/src/sha1.js";
import {EntityReader} from "@theidentityselector/thiss-ds/src/md_extractor.js";
const mdq_url = process.env.MDQ_URL || "https://md.seamlessaccess.org/entities/";


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
}


export const showSuggested = () => {
   console.log(`Showing suggested`);
   if (suggested.length > 0) {
       const suggestedTempl = ejs.compile(suggestedHTML);
       let lang = localization.locale;
       lang = (lang.split('-'))[0];
       $("#searching").addClass('d-none');
       document.getElementById('ds-search-list').innerHTML = ''
       document.getElementById('ds-search-header').innerHTML = ''
       const headerHtml = ejs.render(suggestedHeaderHTML, {
           suggestedString: localization.translateString('suggested-institutions-header')
       });
       let firstSuggested = true;
       const spPromise = json_mdq_get_sp(entityID, mdq_url);
       suggested.forEach(eid => {
           const id = _sha1_id(eid); 
           const url = mdq_url + id + ".json"

           json_mdq(url).then(function(item) {
               if (Array.isArray(item)) {
                   item = item[0];
               }
               const reader = new EntityReader(item);
               const hidden = reader.getAttribute('hidden');

               if (hidden !== true && hidden !== "true") {

                   localization.updateDynamic(item, 'idp');

                   const title_i18n = reader.getAttribute('entityID');
                   let title = reader.getAttribute('title');
                   const title_langs = reader.getAttribute('title_langs');
                   if (lang in title_langs) {
                       title = title_langs[lang];
                   }

                   const domain = reader.getAttribute('domain');
                   const idp_entity_id = reader.getAttribute('entityID');
                   const name_tag = reader.getAttribute('name_tag');
                   const context = {
                       title: title,
                       title_i18n: title_i18n,
                       domain: domain,
                       entity_id: idp_entity_id,
                       name_tag: name_tag,
                   };
                   const html = suggestedTempl(context);

                   if (firstSuggested) {
                       firstSuggested = false;
                       spPromise.then(spEntity => {
                           let spTitle = entityID;
                           if (spEntity) {
                               const spReader = EntityReader(spEntity, 'sp');
                               spTitle = spReader.getAttribute('title');
                               const sp_title_langs = spReader.getAttribute('title_langs');
                               if (lang in sp_title_langs) {
                                   spTitle = sp_title_langs[lang];
                               }
                           }
                           const tooltipHtml = ejs.render(tooltipHTML, {
                               tooltipTitle: localization.translateString('suggested-tooltip-title', spTitle),
                               tooltipText: localization.translateString('suggested-tooltip-text', spTitle)
                           });
                           $("#ds-search-header").html(headerHtml);
                           $("#suggested-tooltip-container").append(tooltipHtml);
                       });
                   }

                   $("#ds-search-list").append(html);
                   console.log(`    Added suggested`);
               }
           }).catch(function(error) {
               console.log("ERROR getting suggested entity:", error);
           });
       });
   }
};


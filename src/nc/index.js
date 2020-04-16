import '../assets/nc.scss';

import { dom, library, config } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

import { DiscoveryComponent } from "../component";
import Storages from '@theidentityselector/js-storage';

config.autoReplaceSvg = 'nest';

library.add(faExclamationCircle);
dom.watch();

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.$ = $;

const Hogan = require("hogan.js");

import '@theidentityselector/thiss-jquery-plugin/src/ds-widget.js';

const localStorageBanner = Hogan.compile(require('!raw-loader!./templates/local_storage_banner.html'));
const learnMoreBanner = Hogan.compile(require('!raw-loader!./templates/learn_more_banner.html'));
const noticeAndConsentActions = Hogan.compile(require('!raw-loader!./templates/notice_and_consent_actions.html'));

$(document).ready(function() {
    const currentInstitution = 'Placeholder';

    $('#notice-and-consent-actions').html(noticeAndConsentActions.render({}));

    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+'ds/?target=https://google.com&return=/&entityID=https://ra21.mnt.se/shibboleth',
        backgroundColor: '#ffffff'
    }).render('#cta');

    if (window.localStorage) {
      $('#learn-more-banner').html(learnMoreBanner.render({}));
      $('#current-institution').text(currentInstitution);
        $('#learn-more-trigger').on('click', function() {
          $("#learn-more-banner").toggleClass("d-none");
        })
    } else {
      $('#local-storage-banner').html(localStorageBanner.render({})).removeClass('d-none');
      $('#notice-and-consent-actions *').attr('disabled', true);
      $('#notice-and-consent-actions a').addClass('disabled');
    }
});

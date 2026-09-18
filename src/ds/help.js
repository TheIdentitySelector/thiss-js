// Help Center panel (issue #315). The DS keeps one content box visible at a
// time (#dsclient, #discovery-response-warning); showHelp() swaps in #help
// and hideHelp() restores whatever was visible. Markup: templates/help.ejs;
// styles: assets/help.scss.
import * as $ from 'jquery';

let hiddenPanel = null;

export function showHelp(article) {
    hiddenPanel = $('#dsclient, #discovery-response-warning').not('.d-none');
    hiddenPanel.addClass('d-none');
    $('#help').removeClass('d-none');
    $('#help details').prop('open', false);
    const target = article && document.getElementById(article);
    if (target) {
        target.open = true;
        target.querySelector('summary').focus();
        target.scrollIntoView({block: 'start'});
    } else {
        const heading = document.querySelector('#help h1');
        heading.focus();
        heading.scrollIntoView({block: 'start'});
    }
}

export function hideHelp() {
    $('#help').addClass('d-none');
    if (hiddenPanel && hiddenPanel.length) {
        hiddenPanel.removeClass('d-none');
    } else {
        $('#dsclient').removeClass('d-none');
    }
    hiddenPanel = null;
}

export function initHelp() {
    $('#help-back-button').on('click', (e) => { e.preventDefault(); hideHelp(); });
    $('#footer-help-link').on('click', (e) => { e.preventDefault(); showHelp(); });
    $('#learn-more-trigger').on('click', (e) => { e.preventDefault(); showHelp('help-remember-me'); });
}

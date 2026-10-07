// Help Center panel (issue #315). The DS keeps one content box visible at a
// time (#dsclient, #discovery-response-warning); showHelp() swaps in #help
// and hideHelp() restores whatever was visible. Markup: templates/help.ejs;
// styles: assets/help.scss.
import * as $ from 'jquery';

let hiddenPanel = null;
let localization = null;
let spTitle = null;

// The article about institutions added by the SP names it: elements marked
// data-i18n-sp carry a $1 key, rendered here once the DS knows the SP title.
// Their data-i18n key is the generic wording Localization applies otherwise.
function renderSpArticles() {
    if (!localization || !spTitle) return;
    $('#help [data-i18n-sp]').each((i, el) => {
        localization.translateStringP(el.dataset.i18nSp, spTitle).then(text => {
            if (text && text !== el.dataset.i18nSp) el.textContent = text;
        });
    });
}

export function setHelpSp(title) {
    spTitle = title;
    renderSpArticles();
}

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

export function initHelp(l10n) {
    localization = l10n;
    document.addEventListener('sa:locale-changed', renderSpArticles);
    $('#help-back-button').on('click', (e) => { e.preventDefault(); hideHelp(); });
    $('#footer-help-link').on('click', (e) => { e.preventDefault(); showHelp(); });
    $('#learn-more-trigger').on('click', (e) => { e.preventDefault(); showHelp('help-remember-me'); });
    // "Learn more" links in the result templates (rendered later) and anywhere
    // else: <a data-help-article="help-..."> opens that article.
    $(document).on('click', 'a[data-help-article]', function (e) {
        e.preventDefault();
        showHelp($(this).data('help-article'));
    });
}

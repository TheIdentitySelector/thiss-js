const I18n = require('banana-i18n');
const I18N_DATA_ATTRIBUTE = '[data-i18n]';
const DEFAULT_LOCALE = 'en';
const localeSelector = document.getElementById('locale-selector');

import {translatable} from "./ds/translatableAttributes.js";

const path_prefix = process.env.PUBLIC_PATH_PREFIX || '/';

export default class Localization extends I18n {
    constructor(locale) {
        super();
        if (locale === undefined) {
            locale = this.formatLocale(window.navigator.userLanguage || window.navigator.language || DEFAULT_LOCALE);
        }
        this.locale = locale;
        this.file = null;
        this.selectAvailableLocale();
        this.selectNewLocale();
        this.dynamic = {};
    }

    updateDynamic (item) {
        if ('title_langs' in item && !!item.title_langs && item.title_langs.constructor === Object) {
            const langs = Object.keys(item.title_langs);
            for (const lang of langs) {
                if (!(lang in this.dynamic)) {
                    this.dynamic[lang] = {}
                }
                this.dynamic[lang][item.entityID] = item.title_langs[lang];
            }
        }
    }

    selectAvailableLocale (defaultLocale) {
        let locale = this.formatLocale(window.navigator.userLanguage || window.navigator.language || DEFAULT_LOCALE);

        if (defaultLocale) {
            locale = this.formatLocale(defaultLocale);
        } else {
            if (this.locale) {
                locale = this.formatLocale(this.locale)
            } else {
                locale = this.formatLocale(locale)
            }
        }

        return this.fetchLocaleFile(locale)
            .catch(() => {
                this.selectAvailableLocale(DEFAULT_LOCALE)
            })
    }

    selectNewLocale () {
        if (localeSelector) {
            localeSelector.addEventListener('change', (event) => {
                // here we also update explicitly the page title
                const accessToPrev = this.translateString('ds-header');
                const titlePrev = $(".header-sp-title").text();

                this.locale = event.target.value;
                this.updateLocaleSelector(event.target.value);
                this.selectAvailableLocale().then(() => {
                    // translate page title and html attributes
                    const accessToPost = this.translateString('ds-header');
                    const titlePost = titlePrev.replace(accessToPrev, accessToPost);
                    $(".header-sp-title").text(titlePost);
                    translatable.forEach(tr => {
                        $(tr[1]).attr(tr[2], this.translateString(tr[0]));
                    });
                    const suggestedHeader = this.translateString('suggested-institutions-header');
                    $("suggested-header-string").html(suggestedHeader);
                    const spEntityTitle = $("suggested-tooltip").dataset.tooltip;
                    const tooltipTitle = this.translateString('suggested-tooltip-title', spEntityTitle);
                    const tooltipText = this.translateString('suggested-tooltip-text', spEntityTitle);
                    $("suggested-tooltip-title").html(tooltipTitle);
                    $("suggested-tooltip-text").html(tooltipText);
                });
            });
        }
    }

    formatLocale(locale) {
        if (locale.split('-')[0]) {
            return locale.split('-')[0]
        } else {
            return DEFAULT_LOCALE
        }
    }

    updateLocaleSelector (locale) {
        if (localeSelector && locale) {
            localeSelector.value = locale
        }
    }

    fetchLocaleFile (locale) {
        return new Promise((resolve, reject) => {
            fetch(`${path_prefix}translations/${locale}.json`)
                .then((response) => {
                    return response.json()
                })
                .then((messages) => {
                    if (locale in this.dynamic) {
                        for (const key of Object.keys(this.dynamic[locale])) {
                            messages[key] = this.dynamic[locale][key];
                        }
                    }
                    this.file = messages
                    this.setLocale(locale);
                    this.load(messages, locale);

                    this.updateLocaleSelector(locale);

                    const allElements = document.querySelectorAll(I18N_DATA_ATTRIBUTE)

                    for (let i = 0; i < allElements.length; i++) {
                        const dataValue = allElements[i].dataset.i18n;

                        if (dataValue) {
                            const string = this.i18n(dataValue)

                            if (string && string !== dataValue) {
                                allElements[i].textContent = string
                            }
                        }
                    }
                    document.documentElement.setAttribute('lang', locale);


                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    translateString (string, ...placeholders) {
        const translated = this.i18n(string, ...placeholders)

        if (this.file && this.file.hasOwnProperty(translated)) {
            if (this.file[translated]) {
                return this.file[translated]
            } else {
                return ''
            }
        } else {
            return translated
        }
    }

    async translateStringP (string, ...placeholders) {
        let translated = '';
        if (this.file !== null && this.file) {
            translated = this.translateString(string, ...placeholders);
        } else {
            let resolved = false;
            for (let n of new Array(60).keys()) {
                if (!resolved) {
                    const secs = 500;
                    await new Promise(resolve => {
                        setTimeout(() => {
                            if (this.file !== null && this.file) {
                                translated = this.translateString(string, ...placeholders);
                                resolved = true;
                            }
                            resolve();
                        }, secs);
                    });
                } else {
                    break;
                }
            }
        }
        return translated;
    }
}


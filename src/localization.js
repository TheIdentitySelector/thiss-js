const I18n = require('banana-i18n');
const I18N_DATA_ATTRIBUTE = '[data-i18n]';
const DEFAULT_LOCALE = 'en';
const localeSelector = document.getElementById('locale-selector');

export default class Localization extends I18n {
    constructor(locale) {
        super();
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

        this.fetchLocaleFile(locale)
            .catch(() => {
                this.selectAvailableLocale(DEFAULT_LOCALE)
            })
    }

    selectNewLocale () {
        if (localeSelector) {
            localeSelector.addEventListener('change', (event) => {
                this.locale = event.target.value;
                this.updateLocaleSelector(event.target.value);
                this.selectAvailableLocale();
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
            fetch(`/translations/${locale}.json`)
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

                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    translateString (string) {
        const translated = this.i18n(string)

        if (this.file.hasOwnProperty(translated)) {
            if (this.file[translated]) {
                return this.file[translated]
            } else {
                return ''
            }
        } else {
            return translated
        }
    }
}


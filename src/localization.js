const I18n = require('banana-i18n/dist/banana-i18n.js');
const I18N_DATA_ATTRIBUTE = '[data-i18n]';
const DEFAULT_LOCALE = 'en';
const localeSelector = document.getElementById('locale-selector');

export default class Localization extends I18n {
    constructor(locale) {
        super();
        this.locale = locale;
        this.selectAvailableLocale();
        this.selectNewLocale();
    }

    selectAvailableLocale (defaultLocale) {

        let locale = this.formatLocale(window.navigator.userLanguage || window.navigator.language || DEFAULT_LOCALE);

        if (defaultLocale) {
            locale = this.formatLocale(defaultLocale);
        } else {
            if (this.locale) {
                locale = this.formatLocale(this.locale)
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
}


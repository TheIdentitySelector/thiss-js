const I18n = require('banana-i18n/dist/banana-i18n.js');

const DEFAULT_LANGUAGE = 'en-US'
const I18N_DATA_ATTRIBUTE = '[data-i18n]'

const locale = window.navigator.userLanguage || window.navigator.language;

const languageSelector = document.getElementById('language-selector')
const i18n = new I18n()

const setLanguage = (language) => {
    i18n.setLocale(language);

    fetch(`/translations/${language}.json`)
        .then((response) => {
            return response.json();
        }).then((messages) => {
            i18n.setLocale(language);
            i18n.load(messages, language);

            const allElements = document.querySelectorAll(I18N_DATA_ATTRIBUTE)

            for (let i = 0; i < allElements.length; i++) {
                const dataValue = allElements[i].dataset.i18n;

                if (dataValue) {
                    const string = i18n.i18n(dataValue)

                    if (string && string !== dataValue) {
                        allElements[i].textContent = string
                    }
                }
            }
        })
        .catch((error) => {
            console.log('error: ', error)
            setLanguage(DEFAULT_LANGUAGE)
        })
}

const language = 'es-ES'

setLanguage(locale)

if (languageSelector) {
    const setLanguageSelector = (language) => {
        languageSelector.value = language
    }

    setLanguageSelector(locale)

    languageSelector.addEventListener('change', (event) => {
        setLanguage(event.target.value)
    });
}

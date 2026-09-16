/**
 * Upgrade Test - button host
 *
 * Renders exactly one thiss.js button, in its own document. zoid 9.0.34
 * registers the component tag in a window global (window.__zoid_9_0_34__),
 * so two thiss.js bundles cannot coexist in one window; /upgrade-test/
 * therefore loads each combination's button through an iframe on this page.
 *
 * Query parameters:
 *   thiss   current | new | frozen   which thiss.js bundle to load
 *   ps      persistence service URL (same-origin only)
 *   ds      discovery request URL   (same-origin only)
 *   result  discovery response URL  (same-origin only)
 */

const BASE_URL = process.env.BASE_URL || '/';

const BUNDLES = {
    current: `${BASE_URL}thiss.js`,
    new: `${BASE_URL}new/thiss.js`,
    frozen: `${BASE_URL}vendor/thiss-1.5.0-dev0.js`,
};

function sameOrigin(value) {
    if (!value) return undefined;
    try {
        const url = new URL(value, window.location.href);
        return url.origin === window.location.origin ? url.href : undefined;
    } catch (err) {
        return undefined;
    }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`could not load ${src}`));
        document.head.appendChild(script);
    });
}

function fail(message) {
    const el = document.getElementById('cta');
    el.innerHTML = `<div class="error">${message}</div>`;
}

async function init() {
    const params = new URLSearchParams(window.location.search);
    const which = params.get('thiss');
    const bundle = BUNDLES[which];
    if (!bundle) {
        fail(`unknown thiss bundle: ${which}`);
        return;
    }
    const psUrl = sameOrigin(params.get('ps'));
    const dsUrl = sameOrigin(params.get('ds'));
    const resultUrl = sameOrigin(params.get('result'));

    try {
        await loadScript(bundle);
    } catch (error) {
        fail(`${error.message}${which === 'new' ? ' (the /new/ paths only exist during a PRE_RELEASE=true deployment)' : ''}`);
        return;
    }
    const thiss = window.thiss;
    if (!thiss || !thiss.DiscoveryComponent) {
        fail(`${bundle} did not export DiscoveryComponent`);
        return;
    }

    // The frozen 2021 bundle has no persistenceURL option: it talks to the
    // live /ps/ through its baked configuration, like a real frozen SP page.
    const props = { discoveryRequest: dsUrl, discoveryResponse: resultUrl };
    if (which !== 'frozen') props.persistenceURL = psUrl;

    try {
        thiss.DiscoveryComponent(props).render('#cta');
    } catch (error) {
        fail(`render failed: ${error.message}`);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

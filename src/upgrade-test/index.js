/**
 * Upgrade Test Page
 *
 * This page tests different combinations of entry point versions
 * to verify upgrade compatibility.
 */

import './styles.scss';
// The bundled (new-generation) thiss-ds client, for the advanced-integration
// cards. Bundled from source, so it uses this build's patched post-robot.
import {PersistenceService} from "@theidentityselector/thiss-ds/src/persist.js";

// URLs for current and new versions
const BASE_URL = process.env.BASE_URL || '/';
const CURRENT_PS = `${BASE_URL}ps/`;
const NEW_PS = `${BASE_URL}new/ps/`;
const ENTITY_ID = encodeURIComponent("https://demo.beta.seamlessaccess.org/shibboleth");
const RESULT_URL = `${BASE_URL}result/`;

// The DS accepts a same-origin psUrl query override (4.0.x+), so each
// combination also pins its DS page to the combination's persistence
// generation; without this the DS always talks to its baked /ps/ and the
// DS×PS half of the matrix is not actually exercised. A 2.1.x "current"
// DS ignores the parameter and keeps its baked /ps/ (which is the same
// generation, so the pairing still holds).
function dsUrl(version, psUrl) {
    const base = version === 'current' ? `${BASE_URL}ds/` : `${BASE_URL}new/ds/`;
    return `${base}?entityID=${ENTITY_ID}&psUrl=${encodeURIComponent(psUrl)}`;
}

// Test login initiator (just shows the result page)
const TEST_LOGIN_INITIATOR = RESULT_URL;

// Script loader utility
function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Define the test combinations
const combinations = [
    {
        id: 1,
        name: 'All Current',
        ctaVersion: 'current',
        psUrl: CURRENT_PS,
        dsUrl: dsUrl('current', CURRENT_PS),
        description: 'Standard production configuration'
    },
    {
        id: 2,
        name: 'All New',
        ctaVersion: 'new',
        psUrl: NEW_PS,
        dsUrl: dsUrl('new', NEW_PS),
        description: 'Full new version (post-upgrade)'
    },
    {
        id: 3,
        name: 'New CTA, Current PS & DS',
        ctaVersion: 'new',
        psUrl: CURRENT_PS,
        dsUrl: dsUrl('current', CURRENT_PS),
        description: 'New CTA with old services'
    },
    {
        id: 4,
        name: 'Current CTA, New PS & DS',
        ctaVersion: 'current',
        psUrl: NEW_PS,
        dsUrl: dsUrl('new', NEW_PS),
        description: 'Old CTA with new services'
    },
    {
        id: 5,
        name: 'New CTA & PS, Current DS',
        ctaVersion: 'new',
        psUrl: NEW_PS,
        dsUrl: dsUrl('current', NEW_PS),
        description: 'New CTA and PS, old DS'
    },
    {
        id: 6,
        name: 'Current CTA & PS, New DS',
        ctaVersion: 'current',
        psUrl: CURRENT_PS,
        dsUrl: dsUrl('new', CURRENT_PS),
        description: 'Old CTA and PS, new DS'
    },
    {
        id: 7,
        name: 'New CTA & DS, Current PS',
        ctaVersion: 'new',
        psUrl: CURRENT_PS,
        dsUrl: dsUrl('new', CURRENT_PS),
        description: 'New CTA and DS, old PS'
    },
    {
        id: 8,
        name: 'Current CTA & DS, New PS',
        ctaVersion: 'current',
        psUrl: NEW_PS,
        dsUrl: dsUrl('current', NEW_PS),
        description: 'Old CTA and DS, new PS'
    }
];

// Each button lives in its own iframe on the host page (host.js), which
// loads exactly one thiss.js bundle. zoid 9.0.34 registers the component
// tag in a window global (window.__zoid_9_0_34__), so a second thiss.js in
// the same window throws "Can not register multiple components with the
// same tag"; one document per bundle is the only way to show several
// generations side by side, and it matches production, where the SP page
// and the cta are separate windows anyway. The host page is resolved
// relative to this page, so it is the same generation as the harness
// (/upgrade-test/host/ or /new/upgrade-test/host/).
function buttonFrame(id, which, psUrl, dsUrl) {
    const host = new URL('host/', window.location.href);
    host.searchParams.set('thiss', which);
    if (psUrl) host.searchParams.set('ps', psUrl);
    host.searchParams.set('ds', dsUrl);
    host.searchParams.set('result', TEST_LOGIN_INITIATOR);

    const frame = document.createElement('iframe');
    frame.id = `cta-frame-${id}`;
    frame.src = host.href;
    frame.title = `thiss.js ${which} button`;
    frame.style.width = '350px';
    frame.style.height = '100px';
    frame.style.border = '0';
    return frame;
}

function renderCombination(combination) {
    const container = document.getElementById(`test-cta-${combination.id}`);
    if (!container) {
        console.warn(`Container not found for combination ${combination.id}`);
        return;
    }
    container.appendChild(buttonFrame(combination.id, combination.ctaVersion, combination.psUrl, combination.dsUrl));
}

// ---- Frozen CDN clients ----
// Byte-identical vendored copies of published npm dists (see
// src/upgrade-test/vendor/), representing SPs whose bundles never change.
// The thiss-ds client UMD bundle overwrites window.thiss on load, so
// capture and restore (nothing else uses window.thiss here any more).

async function loadFrozenModule(url) {
    const saved = window.thiss;
    await loadScript(url);
    const frozen = window.thiss;
    window.thiss = saved;
    return frozen;
}

function withTimeout(promise, ms, label) {
    return Promise.race([
        promise,
        new Promise((resolve, reject) =>
            setTimeout(() => reject(new Error(`${label}: timeout after ${ms}ms`)), ms)),
    ]);
}

function paintCell(id, text, ok) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = text;
        el.style.color = ok ? '#2e7d32' : '#c00';
        el.style.fontWeight = 'bold';
    }
}

// Automated round-trip: the frozen thiss-ds client asks each PS generation
// for the remembered entities. Any resolution (even an empty list) proves
// the wire works; a timeout means the pair cannot talk.
async function checkFrozenDsClient() {
    let frozen;
    try {
        frozen = await loadFrozenModule(`${BASE_URL}vendor/thiss-ds-3.0.3.js`);
        if (!frozen || !frozen.PersistenceService) throw new Error('PersistenceService not exported');
    } catch (error) {
        paintCell('frozen-ds-current', `load failed: ${error.message}`, false);
        paintCell('frozen-ds-new', `load failed: ${error.message}`, false);
        return;
    }
    const context = process.env.DEFAULT_CONTEXT || 'thiss.io';
    for (const [cell, psUrl] of [['frozen-ds-current', CURRENT_PS], ['frozen-ds-new', NEW_PS]]) {
        try {
            const ps = new frozen.PersistenceService(psUrl);
            const result = await withTimeout(ps.entities(context), 5000, psUrl);
            const items = (result && result.data) || [];
            paintCell(cell, `OK (${items.length} remembered)`, true);
        } catch (error) {
            paintCell(cell, `FAILED: ${error.message}`, false);
        }
    }
}

// The 2021 published button: no persistenceURL option, talks to the live
// /ps/ via its baked configuration, like every real frozen SP bundle. It
// calls zoid.create too, so it gets its own host iframe like the others.
function renderFrozenButton() {
    const container = document.getElementById('test-cta-frozen');
    if (!container) return;
    container.appendChild(buttonFrame('frozen', 'frozen', null, dsUrl('current', CURRENT_PS)));
}

// Advanced integration: the bundled (new-generation) thiss-ds client driving
// each PS generation directly, checkbox flow included. entities() proves the
// wire; has_storage_access() exercises the advanced-mode message; the visible
// checkbox exercises init-checkbox and sa-checkbox-clicked when toggled.
async function checkAdvancedClient() {
    const context = process.env.DEFAULT_CONTEXT || 'thiss.io';
    for (const [suffix, psUrl] of [['current', CURRENT_PS], ['new', NEW_PS]]) {
        let ps;
        try {
            ps = new PersistenceService(psUrl, {selector: `#adv-checkbox-${suffix}`});
        } catch (error) {
            paintCell(`adv-entities-${suffix}`, `client failed: ${String(error && error.message || error)}`, false);
            paintCell(`adv-hsa-${suffix}`, 'skipped', false);
            continue;
        }
        try {
            const result = await withTimeout(ps.entities(context), 5000, psUrl);
            const items = (result && result.data) || [];
            paintCell(`adv-entities-${suffix}`, `OK (${items.length} remembered)`, true);
        } catch (error) {
            paintCell(`adv-entities-${suffix}`, `FAILED: ${String(error && error.message || error)}`, false);
        }
        try {
            const hsa = await withTimeout(ps.has_storage_access(context), 5000, psUrl);
            paintCell(`adv-hsa-${suffix}`, `answered: ${hsa && hsa.data}`, true);
        } catch (error) {
            paintCell(`adv-hsa-${suffix}`, `FAILED: ${String(error && error.message || error)}`, false);
        }
    }
}

// Initialize all combinations when the page loads. No thiss.js is loaded
// into this window: every button renders in its own host iframe.
async function init() {
    for (const combination of combinations) {
        renderCombination(combination);
    }
    renderFrozenButton();

    // The post-robot-only clients run in this window; the frozen thiss-ds
    // UMD bundle claims window.thiss, which loadFrozenModule saves/restores.
    await checkFrozenDsClient();
    await checkAdvancedClient();
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

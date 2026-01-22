/**
 * Upgrade Test Page
 *
 * This page tests different combinations of entry point versions
 * to verify upgrade compatibility.
 */

import './styles.scss';

// URLs for current and new versions
const BASE_URL = process.env.BASE_URL || '/';
const CURRENT_PS = `${BASE_URL}ps/`;
const NEW_PS = `${BASE_URL}new/ps/`;
const CURRENT_DS = `${BASE_URL}ds/?entityID=${encodeURIComponent("https://demo.beta.seamlessaccess.org/shibboleth")}`;
const NEW_DS = `${BASE_URL}new/ds/?entityID=${encodeURIComponent("https://demo.beta.seamlessaccess.org/shibboleth")}`;
const RESULT_URL = `${BASE_URL}result/`;

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
        dsUrl: CURRENT_DS,
        description: 'Standard production configuration'
    },
    {
        id: 2,
        name: 'All New',
        ctaVersion: 'new',
        psUrl: NEW_PS,
        dsUrl: NEW_DS,
        description: 'Full new version (post-upgrade)'
    },
    {
        id: 3,
        name: 'New CTA, Current PS & DS',
        ctaVersion: 'new',
        psUrl: CURRENT_PS,
        dsUrl: CURRENT_DS,
        description: 'New CTA with old services'
    },
    {
        id: 4,
        name: 'Current CTA, New PS & DS',
        ctaVersion: 'current',
        psUrl: NEW_PS,
        dsUrl: NEW_DS,
        description: 'Old CTA with new services'
    },
    {
        id: 5,
        name: 'New CTA & PS, Current DS',
        ctaVersion: 'new',
        psUrl: NEW_PS,
        dsUrl: CURRENT_DS,
        description: 'New CTA and PS, old DS'
    },
    {
        id: 6,
        name: 'Current CTA & PS, New DS',
        ctaVersion: 'current',
        psUrl: CURRENT_PS,
        dsUrl: NEW_DS,
        description: 'Old CTA and PS, new DS'
    },
    {
        id: 7,
        name: 'New CTA & DS, Current PS',
        ctaVersion: 'new',
        psUrl: CURRENT_PS,
        dsUrl: NEW_DS,
        description: 'New CTA and DS, old PS'
    },
    {
        id: 8,
        name: 'Current CTA & DS, New PS',
        ctaVersion: 'current',
        psUrl: NEW_PS,
        dsUrl: CURRENT_DS,
        description: 'Old CTA and DS, new PS'
    }
];

// Map to store loaded thiss modules
const thissModules = {};

async function loadThissModule(version) {
    const scriptUrl = version === 'current' ? `${BASE_URL}thiss.js` : `${BASE_URL}new/thiss.js`;

    if (!thissModules[version]) {
        await loadScript(scriptUrl);
        // The thiss module attaches to window.thiss
        thissModules[version] = window.thiss;
    }

    return thissModules[version];
}

async function renderCombination(combination) {
    const container = document.getElementById(`test-cta-${combination.id}`);
    if (!container) {
        console.warn(`Container not found for combination ${combination.id}`);
        return;
    }

    try {
        const thissModule = await loadThissModule(combination.ctaVersion);

        if (!thissModule || !thissModule.DiscoveryComponent) {
            container.innerHTML = `<p style="color: #999; font-size: 0.9em;">
                Could not load ${combination.ctaVersion} thiss.js.
                ${combination.ctaVersion === 'new' ? 'The /new/ paths may not be available (only during step 1 deployment).' : ''}
            </p>`;
            return;
        }

        // Create a unique container for this CTA
        const ctaDiv = document.createElement('div');
        ctaDiv.id = `cta-render-${combination.id}`;
        ctaDiv.style.width = '350px';
        ctaDiv.style.height = '85px';
        container.appendChild(ctaDiv);

        // Render the CTA with overridden URLs
        thissModule.DiscoveryComponent({
            persistenceURL: combination.psUrl,
            discoveryRequest: combination.dsUrl,
            discoveryResponse: TEST_LOGIN_INITIATOR,
        }).render(`#cta-render-${combination.id}`);

    } catch (error) {
        console.error(`Error loading combination ${combination.id}:`, error);
        container.innerHTML = `<p style="color: #c00; font-size: 0.9em;">
            Error loading: ${error.message}
        </p>`;
    }
}

// Initialize all combinations when the page loads
async function init() {
    // Load current version first (it should always be available)
    try {
        await loadThissModule('current');
    } catch (e) {
        console.warn('Could not load current thiss.js:', e);
    }

    // Try to load new version (may not be available)
    try {
        await loadThissModule('new');
    } catch (e) {
        console.warn('Could not load new thiss.js (expected if not in step 1 deployment):', e);
    }

    // Render each combination
    for (const combination of combinations) {
        await renderCombination(combination);
    }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

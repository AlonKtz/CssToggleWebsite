// ===================================
// FRONT END DEVELOPMENT DEMO
// CSS toggle, layer switches and accent color
// ===================================

// The page's CSS is split into separate <link> files, each tagged with data-layer.
// media="not all" matches no screen, so the browser ignores that file completely.
// (Toggling link.disabled reloads the file each time and can lose a quick second toggle.)
const layerLinks = {};
document.querySelectorAll('link[data-layer]').forEach((link) => {
    layerLinks[link.dataset.layer] = link;
});

// State
let cssEnabled = true;
const layerEnabled = { colors: true, boxes: true, layout: true, effects: true };

// DOM elements
const masterBtn = document.getElementById('toggle-css-btn');
const layerInputs = document.querySelectorAll('input[data-toggle]');
const swatches = document.querySelectorAll('.demo-swatch');
const statusText = document.getElementById('demo-status');
const layersDetails = document.getElementById('layers-details');

const LAYER_NAMES = {
    colors: 'Colors & type',
    boxes: 'Spacing & boxes',
    layout: 'Layout',
    effects: 'Effects'
};

// ===================================
// APPLY STATE TO THE PAGE
// ===================================

function setLinkOn(link, on) {
    link.media = on ? 'all' : 'not all';
}

function render() {
    // Tokens are shared by every layer, so they follow the main switch only
    setLinkOn(layerLinks.tokens, cssEnabled);

    Object.keys(layerEnabled).forEach((name) => {
        setLinkOn(layerLinks[name], cssEnabled && layerEnabled[name]);
    });

    masterBtn.textContent = cssEnabled ? 'CSS is ON' : 'CSS is OFF';
    masterBtn.setAttribute('aria-pressed', String(cssEnabled));

    layerInputs.forEach((input) => {
        input.checked = layerEnabled[input.dataset.toggle];
        input.disabled = !cssEnabled;
    });

    statusText.textContent = describeState();
}

function describeState() {
    if (!cssEnabled) return 'No CSS: this is the plain HTML.';

    const off = Object.keys(layerEnabled).filter((name) => !layerEnabled[name]);
    if (off.length === 0) return 'All CSS is on.';
    if (off.length === 4) return 'Every layer is off.';
    return 'Off: ' + off.map((name) => LAYER_NAMES[name]).join(', ');
}

// ===================================
// CONTROLS
// ===================================

function toggleCss() {
    cssEnabled = !cssEnabled;
    render();
}

function toggleLayer(name) {
    if (!cssEnabled) return;
    layerEnabled[name] = !layerEnabled[name];
    render();
}

masterBtn.addEventListener('click', toggleCss);

layerInputs.forEach((input) => {
    input.addEventListener('change', () => toggleLayer(input.dataset.toggle));
});

// Accent color: change two custom properties and every rule that uses them updates
swatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
        const root = document.documentElement.style;
        root.setProperty('--color-accent', swatch.dataset.accent);
        root.setProperty('--color-accent-2', swatch.dataset.accent2);

        swatches.forEach((s) => s.setAttribute('aria-pressed', String(s === swatch)));
    });
});

// Keyboard shortcuts: C toggles all CSS, 1-4 toggle a layer
const LAYER_KEYS = { 1: 'colors', 2: 'boxes', 3: 'layout', 4: 'effects' };

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target;
    if (target instanceof Element && target.closest('input:not([type="checkbox"]), textarea, select, [contenteditable]')) return;

    if (event.key === 'c' || event.key === 'C') {
        toggleCss();
    } else if (LAYER_KEYS[event.key]) {
        toggleLayer(LAYER_KEYS[event.key]);
    }
});

// ===================================
// LIVE EXAMPLE
// ===================================

const myButton = document.getElementById('myButton');
const count = document.getElementById('count');
let clicks = 0;

myButton.addEventListener('click', () => {
    clicks++;
    count.textContent = `Clicked ${clicks} ${clicks === 1 ? 'time' : 'times'}`;

    // Restart the pop animation from effects.css
    count.classList.remove('pop');
    void count.offsetWidth;
    count.classList.add('pop');
});

// ===================================
// INITIALIZATION
// ===================================

// The layer list starts open where there is room for it
if (window.matchMedia('(min-width: 769px)').matches) {
    layersDetails.open = true;
}

document.getElementById('year').textContent = new Date().getFullYear();

render();

console.log('🎨 Front End Development Demo loaded');
console.log('💡 Press C to toggle all CSS, or 1-4 to toggle one layer.');

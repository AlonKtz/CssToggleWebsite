// ===================================
// FRONT END DEVELOPMENT DEMO
// CSS Toggle Functionality
// ===================================

// State Management
let cssEnabled = true;

// DOM Elements
const stylesheet = document.getElementById('main-stylesheet');
const toggleCssBtn = document.getElementById('toggle-css-btn');

// ===================================
// CSS TOGGLE CONTROL
// ===================================

toggleCssBtn.addEventListener('click', () => {
    cssEnabled = !cssEnabled;
    
    if (cssEnabled) {
        // Enable CSS
        stylesheet.removeAttribute('disabled');
        toggleCssBtn.textContent = 'Toggle CSS';
        toggleCssBtn.classList.remove('disabled');
    } else {
        // Disable CSS
        stylesheet.setAttribute('disabled', 'disabled');
        toggleCssBtn.textContent = 'Enable CSS';
        toggleCssBtn.classList.add('disabled');
    }
});

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Front End Development Demo Loaded');
    console.log('💡 Try toggling the CSS to see how styling transforms the page!');
});

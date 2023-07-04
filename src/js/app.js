/**
 * --------------------------------------------------------------------------
 * Style Guideline: app.js
 * Licensed under MIT (https://github.com/mkfizi/style-guideline/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

'use strict';

let app = {
    name: 'Style Guideline',
    version: '0.2.0',
};

app.elements = {
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    footerYear: document.getElementById('footer-year'),
    footerAppName: document.getElementById('footer-app-name'),
    footerAppVersion: document.getElementById('footer-app-version'),
};

app.init = () => {
    app.view.init();
    app.event.init();
};

app.event = {
    init: () => {
        document.addEventListener('click', app.event.handleDocumentClick);
        window.addEventListener('resize', app.event.handleWindowResize);
    },

    handleDocumentClick: event => {
        const target = event.target;

        if (target.closest('[id="dark-mode-toggle"]')) {
            app.view.darkMode.toggle();
        }
    },

    handleWindowResize: () => {
        app.view.viewportHeight.toggle();
    }
};

app.view = {
    init: () => {
        app.view.viewportHeight.toggle();
        app.view.footer.toggle();
    },

    viewportHeight: {
        toggle: () => {
            document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
        }
    },

    darkMode: {
        toggle: () => {
            app.util.transition.toggle();

            const isLightMode = localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches);
            localStorage.theme = isLightMode ? 'dark' : 'light';
            document.documentElement.classList.toggle('dark', isLightMode);
        }
    },

    footer: {
        toggle: () => {
            if (app.elements.footerYear) {
                app.elements.footerYear.innerHTML = new Date().getFullYear();
            }
    
            if (app.elements.footerAppName) {
                app.elements.footerAppName.innerHTML = app.name;
            }
            
            if (app.elements.footerAppVersion) {
                app.elements.footerAppVersion.innerHTML = app.version;
            }
        }
    }
};

app.util = {
    transition: {
        toggle: () => {
            const transitions = document.querySelectorAll('.transition, .transition-all, .transition-colors, .transition-opacity, .transition-shadow, .transition-transform');
            for (const transition of transitions) {
                transition.classList.add('transition-none');
                setTimeout(() => {
                    transition.classList.remove('transition-none');
                }, 100);
            }
        }
    }
};

app.init();
// ==UserScript==
// @name         The West Forum - OG Background
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Podmienia obrazek tła na forum The West PL.
// @author       mxj
// @match        https://forum.the-west.pl/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
'use strict';

const newBackgroundImageUrl = 'https://forum.the-west.pl/styles/game/mainbg.jpg';
let styleElement = null;

function applyNewBackgroundStyles() {
    if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
    }

    styleElement = document.createElement('style');
    styleElement.type = 'text/css';

    styleElement.innerHTML = `
        body, html {
            background: url(${newBackgroundImageUrl}) no-repeat center top fixed !important;
            background-size: cover !important;
        }
    `;

    if (document.head) {
        document.head.appendChild(styleElement);
    } else {
        document.documentElement.appendChild(styleElement);
    }
}

const handleMutations = (mutationsList, observer) => {
    applyNewBackgroundStyles();
};

const observerOptions = {
    childList: true,
    subtree: true,
    attributes: true
};

window.addEventListener('DOMContentLoaded', () => {
    applyNewBackgroundStyles();

    const observer = new MutationObserver(handleMutations);

    if (document.body) {
        observer.observe(document.body, observerOptions);
    }
});

window.addEventListener('load', () => {
    if (!document.body) {
        applyNewBackgroundStyles();
        const observer = new MutationObserver(handleMutations);
        if (document.body) {
            observer.observe(document.body, observerOptions);
        }
    }
});

applyNewBackgroundStyles();

})();
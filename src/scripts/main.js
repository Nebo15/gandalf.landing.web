document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var menu = document.querySelector('.menu');

    document.querySelector('.menu-toggle').addEventListener('click', function (e) {
        menu.classList.toggle('active');
    });

    hljs.initHighlightingOnLoad();
});
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var menu = document.querySelector('.menu'),
        menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', function (e) {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    hljs.initHighlightingOnLoad();
});
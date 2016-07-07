(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var menu = document.querySelector('.menu'),
            menuToggle = document.querySelector('.menu-toggle');

        menuToggle.addEventListener('click', function () {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        hljs.initHighlightingOnLoad();
    });
})();
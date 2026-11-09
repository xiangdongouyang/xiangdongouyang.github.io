/* X.d Prototype - main.js */
(function () {
  'use strict';

  /* ---- mobile navigation ---- */
  var burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') document.body.classList.remove('nav-open');
    });
  }

  /* ---- hero video: load only when it is worth it ----
     The poster image is the LCP element; the video enhances the
     experience on capable desktop connections only. */
  var video = document.querySelector('video[data-hero]');
  if (video) {
    var conn = navigator.connection || {};
    var saveData = conn.saveData;
    var slow = /2g/.test(conn.effectiveType || '');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var wide = window.matchMedia('(min-width: 768px)').matches;
    if (!saveData && !slow && !reduced) {
      video.src = wide ? video.dataset.heroDesktop || '/assets/video/hero.mp4'
                       : video.dataset.heroMobile || '/assets/video/hero-mobile.mp4';
      video.addEventListener('canplay', function () {
        video.style.opacity = '1';
        video.play().catch(function () {});
      });
      video.style.opacity = '0';
      video.style.transition = 'opacity .8s ease';
      video.load();
    }
  }

  /* ---- contact form: show chosen file name ---- */
  var fileInput = document.querySelector('.file-drop input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var label = document.querySelector('[data-file-name]');
      if (label && fileInput.files.length) {
        label.hidden = false;
        label.textContent = 'Attached: ' + fileInput.files[0].name;
      }
    });
  }

  /* ---- current year in footer ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

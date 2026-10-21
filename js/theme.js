/**
 * RISHABH DEY — THEME CONTROLLER
 * Website is permanently in light mode per AEC visual specification.
 */
(function() {
  'use strict';

  const root = document.documentElement;

  // Clear any existing stored theme preference so returning visitors don't load dark mode
  try {
    localStorage.removeItem('rd-aec-theme');
  } catch (e) {}

  // Enforce light mode on root
  root.setAttribute('data-theme', 'light');

  // Safety fallback helper if invoked by any script
  window.applyPortfolioTheme = function() {
    root.setAttribute('data-theme', 'light');
  };
})();


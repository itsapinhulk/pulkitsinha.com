window.__theme = (function() {
  function isLight() {
    return document.documentElement.classList.contains('light-mode');
  }

  function toggle() {
    const next = !isLight();
    document.documentElement.classList.toggle('light-mode', next);
    localStorage.setItem('theme', next ? 'light' : 'dark');
    return next;
  }

  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light-mode');
  }

  return { isLight, toggle };
})();

// меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
}

// Тема
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('greencare-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('greencare-theme', isDark ? 'dark' : 'light');
  });
}
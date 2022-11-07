const darkThemeBtn = document.querySelector('.toggle-darktheme-btn');

darkThemeBtn.addEventListener('click', () => {
  if (document.body.classList.contains('darkTheme')) {
    onLigthTheme();
  } else {
    onDarkTheme();
  }
});

function onLigthTheme() {
  document.body.classList.remove('darkTheme');
  darkThemeBtn.textContent = '🌙';
  localStorage.theme = 'ligth';
}

function onDarkTheme() {
  document.body.classList.add('darkTheme');
  darkThemeBtn.textContent = '🔆';
  localStorage.theme = 'darkTheme';
}
if (localStorage.theme === 'darkTheme') {
  onDarkTheme();
}

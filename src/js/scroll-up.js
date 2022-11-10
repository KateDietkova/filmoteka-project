
const upBtn = document.querySelector('.scroll-up-button');

window.addEventListener('scroll', HideElementOnScroll);
upBtn.addEventListener('click', ScrollToTop);

function HideElementOnScroll() {
  if (window.scrollY > 800) {
  upBtn.classList.remove('is-hidden');
  } else {
    upBtn.classList.add('is-hidden');
  }
}

function ScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const upBtn = document.querySelector('.scroll-up-button');

window.addEventListener('scroll', hideElementOnScroll);
upBtn.addEventListener('click', scrollToTop);

function hideElementOnScroll() {
  if (window.scrollY > 800) {
  upBtn.classList.remove('is-hidden');
  } else {
    upBtn.classList.add('is-hidden');
  }
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
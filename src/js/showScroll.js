const header = document.querySelector('.header');
const body = document.querySelector('body');

let lastScroll = 0;
const defaultOfSet = 230;

// отримання значення прокрутки
const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;

const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', showScroll);
function showScroll() {
  if (scrollPosition() < lastScroll && !containHide()) {
    //scroll down
    header.classList.add('hide');
    body.classList.add('fixed');
  } else if (scrollPosition() > lastScroll && containHide()) {
    //scroll up
    header.classList.remove('hide');
  }

  lastScroll = scrollPosition();
}

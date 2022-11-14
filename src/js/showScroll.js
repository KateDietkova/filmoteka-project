const header = document.querySelector('.header');

let lastScroll;
const defaultOfSet = 200;

// отримання значення прокрутки
const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;

const containHide = () => header.classList.contains('hide');
window.addEventListener('scroll', () => {
  if (
    scrollPosition() > lastScroll &&
    !containHide() &&
    scrollPosition() > defaultOfSet
  ) {
    //scroll down

    header.classList.add('hide');
  } else if (scrollPosition() < lastScroll && containHide()) {
    //scroll up
    header.classList.remove('hide');
  }

  lastScroll = scrollPosition();
});
// function showScroll()

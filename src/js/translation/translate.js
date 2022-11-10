import { translations } from './langs';

let lang = '';

window.addEventListener('load', onLoad);

const select = document.getElementById('langs');
select.addEventListener('change', onChangeTranslate);

function onLoad() {
  getLangFromStorage();
  changePathname();
  translateTexts();
}

function getLangFromStorage() {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
    select.value = lang;
  } else {
    lang = select.value;
  }
}

function onChangeTranslate() {
  updateStorage();
  changePathname();
  translateTexts();
  translatePlaceholder();
}

function translateTexts() {
  for (let key in translations) {
    let elem = document.querySelector('.lng-' + key);
    if (elem) {
      elem.innerHTML = translations[key][lang];
    }
  }
}

function translatePlaceholder() {
  console.log(document.querySelector('.header-input'));
  const headerInput = document.querySelector('.header-input');
  headerInput.placeholder = translations.search[lang];
}

function updateStorage() {
  lang = select.value;
  localStorage.setItem('lang', lang);
}

function changePathname() {
  location.href = `${window.location.pathname}#${lang}`;
}

export { lang, translateTexts, getLangFromStorage };

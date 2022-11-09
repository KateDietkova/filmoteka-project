import { translations } from './langs';

let lang = '';

window.addEventListener('load', checkStorage);

const select = document.getElementById('langs');
select.addEventListener('change', onChangeTranslate);

function checkStorage() {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
    console.log(typeof lang); // проверить тип данных на выходе из стореджа
    select.value = lang;
    changePathname();
    translateTexts();
  }
}

function onChangeTranslate() {
  updateStorage();
  changePathname();
  // В фетч импортнуть lang из хранилища для запроса с текущим языком
  // добавить сюда асинхронный фетч с новым запросом
  translateTexts();
}

// В рендер модалки импортнуть эту функцию, translations и lang
export function translateTexts() {
  for (let key in translations) {
    let elem = document.querySelector('.lng-' + key);
    if (elem) {
      elem.innerHTML = translations[key][lang];
    }
  }
  const headerInput = document.querySelector('.header-input');
  if (headerInput) {
    headerInput.placeholder = translations.search[lang];
  }
}

function updateStorage() {
  lang = select.value;
  localStorage.setItem('lang', lang);
}

function changePathname() {
  location.href = `${window.location.pathname}#${lang}`;
}

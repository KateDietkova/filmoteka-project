import { initializeApp } from 'firebase/app';
import { translations } from '../translation/langs';
import { getLangFromStorage } from '../translation/translate';
import { Notify } from 'notiflix';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBgWT3X_OQeVji4QMqoYhE3xZ9-_rIXVb4',
  authDomain: 'filmoteka-geek.firebaseapp.com',
  projectId: 'filmoteka-geek',
  storageBucket: 'filmoteka-geek.appspot.com',
  messagingSenderId: '189885109540',
  appId: '1:189885109540:web:0ce48954a2686df48c4fb1',
};

let lang = getLangFromStorage();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
auth.languageCode = lang;

const authBtn = document.querySelector('[data-modal-google-auth]');
const logOutBtn = document.querySelector('[data-logout]');

const welcomeTxt = translations.welcome[lang];

window.addEventListener('load', onLoadCheckStat);

export function onLoadCheckStat() {
  const libraryItem = document.querySelector('[data-library-item]');
  const logOutItem = document.querySelector('[data-logout-item');
  const logInItem = document.querySelector('[data-login-item');

  if (localStorage.getItem('actions')) {
    console.log(`logged-in`);
    logInItem.classList.add('visually-hidden');
    libraryItem.classList.remove('visually-hidden');
    logOutItem.classList.remove('visually-hidden');
    logOutBtn.addEventListener('click', authHandler);
  } else {
    console.log(`logged-out`);
    libraryItem.classList.add('visually-hidden');
    logOutItem.classList.add('visually-hidden');
    authBtn.addEventListener('click', authHandler);
    logInItem.classList.remove('visually-hidden');
  }
}

async function authHandler(e) {
  if (localStorage.getItem('actions') === 'logged-in') {
    signOut(auth);
    Notify.info(`You signed out`);
    localStorage.removeItem('actions');
    window.location.href = './index.html';
  } else {
    document.querySelector('[data-loginmodal]').classList.add('is-hidden');

    try {
      signInWithPopup(auth, provider).then(res => {
        Notify.success(`${welcomeTxt}, ${res.user.displayName}`);
        localStorage.setItem('actions', 'logged-in');
        window.location.href = './library.html';
      });
    } catch (error) {
      console.log(error);
    }
  }
}

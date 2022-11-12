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

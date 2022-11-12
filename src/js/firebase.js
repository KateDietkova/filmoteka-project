import { initializeApp } from 'firebase/app';
import {createUserWithEmailAndPassword, signOut, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyB1gqHtBOUMphKTiGWR9YsIglVX_WL0aJY",
  authDomain: "filmoteka-1111.firebaseapp.com",
  projectId: "filmoteka-1111",
  storageBucket: "filmoteka-1111.appspot.com",
  messagingSenderId: "325243425801",
  appId: "1:325243425801:web:2de9058b0dbb904db394d8",
  measurementId: "G-3LFTX0VRES"
});

const btnLogin =document.querySelector('.btnLogin')
const btnSingUp =document.querySelector('.btnSingUp')
const btnLogout =document.querySelector('.btnLogout')

const loginEmailPasword = async () => {
  const loginEmail = document.querySelector('#email').value
  const loginPassword = document.querySelector('#password').value
  try{
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  }
  catch (error) {
    console.log(error);
    

  }
}



const createAccount = async () => {
  const loginEmail = document.querySelector('#email').value
  const loginPassword = document.querySelector('#password').value
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  }
  catch (error) {
    console.log(error);
  }
}



const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      // showApp()
      // showLoginState(user)

      // hideLoginError()
      // hideLinkError()
    }
    else {
      
      // showLoginForm()
      // lblAuthState.innerHTML = `You're not logged in.`
    }
  })
}

const logout = async () => {
  await signOut(auth);
}


btnLogin.addEventListener('click', loginEmailPasword);
btnSingUp.addEventListener('click', createAccount);
btnLogout.addEventListener("click", logout);



const auth = getAuth(firebaseApp);
monitorAuthState();







































































const refs = {
  openModalBtn:document.querySelector('[data-modal-open]'),
  formSignIn: document.querySelector('#form-sign-in'),
  formSignUp: document.querySelector('#form-sign-up'),
  logInBtn: document.querySelector('#log-in-btn'),
  signInBtn: document.querySelector('#sign-in-btn'),
  signUpBtn: document.querySelector('#sign-up-btn'),
  closeModalBtn: document.querySelector('[data-loginmodal-close]'),
  closeSignUpBtn: document.querySelector('[data-signupmodal-close]'),
  modal: document.querySelector('[data-loginmodal]'),
  signUpModal: document.querySelector("[data-signupmodal]"),

}

if (refs.openModalBtn) {
  refs.openModalBtn.addEventListener('click', openModal);
}

if (refs.closeModalBtn) {
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.closeSignUpBtn.addEventListener('click', closeModal);
} 

function openModal() {
  refs.modal.classList.remove('is-hidden');
  refs.signUpModal.classList.add('is-hidden');
  if (refs.signUpBtn) {
    refs.signUpBtn.addEventListener('click', openSignUpModal)
  }
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  refs.signUpModal.classList.add('is-hidden');
}


function openSignUpModal() {
refs.signUpModal.classList.remove('is-hidden');
refs.modal.classList.add('is-hidden');
  if (refs.signInBtn) {
    refs.signInBtn.addEventListener('click', openModal);
  }
}
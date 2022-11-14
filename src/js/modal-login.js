const openModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-loginmodal-close]');
const closeSignUpBtn = document.querySelector('[data-signupmodal-close]');
const modal = document.querySelector('[data-loginmodal]');
const signUpModal = document.querySelector("[data-signupmodal]");
const signUpBtn = document.querySelector('#sign-up-btn');
const signInBtn = document.querySelector('#sign-in-btn');

if (openModalBtn) {
  openModalBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
  closeSignUpBtn.addEventListener('click', closeModal);
} 

function openModal() {
  modal.classList.remove('is-hidden');
  signUpModal.classList.add('is-hidden');
  if (signUpBtn) {
    signUpBtn.addEventListener('click', openSignUpModal)
  }
}

function closeModal() {
  modal.classList.add('is-hidden');
  signUpModal.classList.add('is-hidden');
}


function openSignUpModal() {
signUpModal.classList.remove('is-hidden');
modal.classList.add('is-hidden');
  if (signInBtn) {
    signInBtn.addEventListener('click', openModal);
  }
}
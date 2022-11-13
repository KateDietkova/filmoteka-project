const openModalBtn = document.querySelector('[data-modal-open]');
const modal = document.querySelector('[data-loginmodal]');
const closeModalBtn = document.querySelector('[data-loginmodal-close]');
const signUpBtn = document.querySelector('[data-signupmodal]');
const signUpModal = document.querySelector('.signup-modal');


if (openModalBtn) {
  openModalBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

function openModal() {
  modal.classList.remove('is-hidden');
  signUpBtn.addEventListener('click', openSignUp)
}

function closeModal() {
  modal.classList.add('is-hidden');
}

function openSignUp() {
  signUpModal.classList.remove('is-hidden');
}

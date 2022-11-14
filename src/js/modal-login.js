const openModalBtn = document.querySelector('[data-modal-open]');
const modal = document.querySelector('[data-loginmodal]');
const closeModalBtn = document.querySelector('[data-loginmodal-close]');

if (openModalBtn) {
  openModalBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

function openModal() {
  modal.classList.remove('is-hidden');
}

function closeModal() {
  modal.classList.add('is-hidden');
}
const openModalBtn = document.querySelector('[data-modal-open]');
const modal = document.querySelector('[data-loginmodal]');
const closeModalBtn = document.querySelector('[data-loginmodal-close]');
import { scrollController } from './scrollController';

if (openModalBtn) {
  openModalBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

function openModal() {
  scrollController.disabledScroll();
  modal.classList.remove('is-hidden');
}

function closeModal() {
  scrollController.enabledScroll();
  modal.classList.add('is-hidden');
}

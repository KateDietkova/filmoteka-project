const closeModalBtn = document.querySelector('[data-loginmodal-close]');
console.log(closeModalBtn);
const openModalBtn = document.querySelector('[data-modal-open]');
console.log(openModalBtn);
const modal = document.querySelector('[data-loginmodal]');
console.log(modal);

openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  modal.classList.toggle('is-hidden');
}

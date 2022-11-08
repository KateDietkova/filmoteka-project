const closeModalBtn = document.querySelector('[data-loginmodal-close]');
console.log(closeModalBtn);
const openModalBtn = document.querySelector('[data-modal-open]');
console.log(openModalBtn);
const modal = document.querySelector('[data-loginmodal]');
console.log(modal);
const modalForm = document.querySelector('.modal__form');


openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
modalForm.addEventListener('submit', onFormSubmit);


function toggleModal() {
  modal.classList.toggle('is-hidden');
}

function onFormSubmit(event) {
  event.preventDefault();

}

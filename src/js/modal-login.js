const closeModalBtn = document.querySelector('[data-loginmodal-close]');
console.log(closeModalBtn);
const openModalBtn = document.querySelector('[data-modal-open]');
console.log(openModalBtn);
const modal = document.querySelector('[data-loginmodal]');
console.log(modal);
const form = document.querySelector(".register-form");


openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);



function toggleModal() {
  modal.classList.toggle('is-hidden');
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const {
    elements: { username, password }
  } = event.currentTarget;
  console.log(username.value, password.value);
});


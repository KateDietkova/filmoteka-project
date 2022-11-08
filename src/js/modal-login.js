try {
  const closeModalBtn = document.querySelector('[data-loginmodal-close]');
  const openModalBtn = document.querySelector('[data-modal-open]');
  const modal = document.querySelector('[data-loginmodal]');

  openModalBtn.addEventListener('click', toggleModal);
  closeModalBtn.addEventListener('click', toggleModal);
  function toggleModal() {
    modal.classList.toggle('is-hidden');
  }
} catch (error) {
  return;
}

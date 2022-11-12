try {
  const closeModalBtn = document.querySelector('[data-loginmodal-close]');
  const openModalBtn = document.querySelector('[data-modal-open]');
  const openModalSignBtn = document.querySelector('[data-modalsign-open]');
  const modal = document.querySelector('[data-loginmodal]');

  openModalBtn.addEventListener('click', toggleModal);
  closeModalBtn.addEventListener('click', toggleModal);
  openModalSignBtn.addEventListener('click', toggleModal);
  function toggleModal() {
    modal.classList.toggle('is-hidden');
  }
} catch (error) {
  return;
}

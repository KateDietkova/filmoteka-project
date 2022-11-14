import teamTemplate from '../../templates/team.hbs';
import team from './team.json';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import Loading from '../loader.js';

const ESCAPE = 'Escape';

const modalContainer = document.querySelector('#js-modal-team');
modalContainer.addEventListener('click', openModal);

function openModal(e) {
  Loading.pulse();
  e.preventDefault();
  try {
    Loading.remove();
    getTeamInfo(team);
  } catch (error) {
    console.error('Sorry modal not working' + error);
  }
}

function getTeamInfo(e) {
  const teamMarkup = teamTemplate(e);
  const modalContent = basicLightbox.create(teamMarkup);

  modalContent.show();

  window.addEventListener('keydown', closeModalEsc);

  function closeModalEsc(e) {
    if (e.code === ESCAPE) {
      modalContent.close();
      window.removeEventListener('keydown', closeModalEsc);
    }
  }

  const btnCloseRef = document.querySelector('.team__close-btn');
  btnCloseRef.addEventListener('click', closeModalBtn);

  function closeModalBtn() {
    modalContent.close();
    btnCloseRef.removeEventListener('click', closeModalBtn);
  }
}

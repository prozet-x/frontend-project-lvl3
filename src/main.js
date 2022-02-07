// import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import onChange from 'on-change';
import News from './classes/classNews';
import Feeds from './classes/classFeeds';

/* eslint no-undef: "error" */
/* eslint-env browser */

const addingStatusDivEl = document.getElementById('addingStatusMessage'); // div. Содержит описание ошибки при попытке ввести адрес RSS-ленты
const inputRSSDivEl = document.getElementById('newRSSAdress'); // input. Сюда вводим новый адрес RSS-ленты

const renderStatus = (stateStatus) => { // Отрисовывает изменение ошибки при вводе новой RSS-ленты
  addingStatusDivEl.textContent = stateStatus.status;
  if (stateStatus.error) {
    inputRSSDivEl.classList.add('is-invalid');
    addingStatusDivEl.classList.remove('text-success');
    addingStatusDivEl.classList.add('text-danger');
  } else {
    inputRSSDivEl.classList.remove('is-invalid');
    addingStatusDivEl.classList.add('text-success');
    addingStatusDivEl.classList.remove('text-danger');
    inputRSSDivEl.value = '';
    inputRSSDivEl.focus();
  }
};

const render = (state) => {
  renderStatus(state.status);
};

const app = () => {
  const state = {
    feeds: new Feeds(),
    status: {
      status: '',
      error: false,
    },
    news: new News(),
  };

  const notValidURLErr = 'Ссылка должна быть валидным URL!';
  const RSSAlreadyExistErr = 'RSS уже существует!';

  // const watchedSate = onChange(state, () => render(state));
  const watchedStateFeeds = onChange(state.feeds, () => render(state));
  const watchedStateStatus = onChange(state.status, () => render(state));
  const watchedStateNews = onChange(state.news, () => render(state));

  const schema = yup
    .string()
    .url(notValidURLErr)
    .notOneOf([state.feeds.urls], RSSAlreadyExistErr);

  const rssForm = document.getElementById('rssForm');
  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    schema.validate(inputRSSDivEl.value)
      .then((value) => {
        watchedStateFeeds.addNewFeed(value, 'TEST NAME');
        watchedStateStatus.status = 'RSS успешно загружен';
        watchedStateStatus.error = false;
      })
      .catch((err) => {
        watchedStateStatus.status = err.message;
        watchedStateStatus.error = true;
      });
  });
};

app();

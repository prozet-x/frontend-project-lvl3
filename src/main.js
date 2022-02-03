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

const renderError = (stateError) => { // Отрисовывает изменение ошибки при вводе новой RSS-ленты
  addingStatusDivEl.textContent = stateError.error;
  if (stateError.error) {
    inputRSSDivEl.classList.add('is-invalid');
    inputRSSDivEl.classList.remove('text-success');
  } else {
    inputRSSDivEl.classList.remove('is-invalid');
  }
};

const render = (state) => {
  renderError(state.error);
};

const app = () => {
  const state = {
    feeds: new Feeds(),
    status: { status: '' },
    news: new News(),
  };

  const notValidURLErr = 'Ссылка должна быть валидным URL!';
  const RSSAlreadyExistErr = 'RSS уже существует!';

  // const watchedSate = onChange(state, () => render(state));
  const watchedStateFeeds = onChange(state.feeds, () => render(state));
  const watchedStateStatus = onChange(state.error, () => render(state));
  const watchedStateNews = onChange(state.news, () => render(state));

  const schema = yup
    .string()
    .url(notValidURLErr)
    .notOneOf([state.feeds.urls], RSSAlreadyExistErr);

  const rssForm = document.getElementById('rssForm');
  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // alert(state.feeds.getAllFeedsURLs());
    const rssAdressFromUser = document.getElementById('newRSSAdress').value;
    schema.validate(rssAdressFromUser)
      .then((value) => {
        watchedStateFeeds.addNewFeed(value, 'TEST NAME');
        watchedStateStatus.status = '';
      })
      .catch((err) => { watchedStateError.error = err.message; });
  });
};

app();

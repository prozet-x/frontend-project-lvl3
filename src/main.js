// import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import onChange from 'on-change';

/* eslint no-undef: "error" */
/* eslint-env browser */

const errorDiv = document.getElementById('errorMessage');
const inputRSSDivEl = document.getElementById('newRSSAdress');

const render = (state) => {
  errorDiv.textContent = state.error;
  if (state.error) {
    inputRSSDivEl.classList.add('is-invalid');
  } else {
    inputRSSDivEl.classList.remove('is-invalid');
  }
};

const app = () => {
  const state = {
    feeds: [],
    error: '',
  };

  const notValidURLErr = 'Ссылка должна быть валидным URL!';
  const RSSAlreadyExistErr = 'RSS уже существует!';

  const watchedSate = onChange(state, () => render(state));

  const schema = yup
    .string()
    .url(notValidURLErr)
    .notOneOf([state.feeds], RSSAlreadyExistErr);

  const rssForm = document.getElementById('rssForm');
  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rssAdressFromUser = document.getElementById('newRSSAdress').value;
    schema.validate(rssAdressFromUser)
      .then((value) => {
        watchedSate.feeds.push(value);
        watchedSate.error = '';
      })
      .catch((err) => { watchedSate.error = err.message; });
  });
};

app();

// import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import onChange from 'on-change';

/* eslint no-undef: "error" */
/* eslint-env browser */

const render = (state) => {
  
};

const app = () => {
  const state = {
    feeds: [],
    error: '',
  };

  const noAdressErr = 'Нужно ввести адрес RSS-ленты!';
  const notValidURLErr = 'Ссылка должна быть валидным URL!';

  const watchedSate = onChange(state, () => render(state));

  const schema = yup
    .string()
    .required(noAdressErr)
    .url(notValidURLErr);

  const rssForm = document.getElementById('rssForm');
  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rssAdressFromUser = document.getElementById('newRSSAdress').value;
    schema.validate(rssAdressFromUser)
    // .then((value) => )
      .catch((err) => { watchedSate.error = err.mesage; });
  });
};

app();

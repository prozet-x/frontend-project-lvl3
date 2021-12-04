// import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import onChange from 'on-change';

/* eslint no-undef: "error" */
/* eslint-env browser */

const app = () => {
  const state = {
    feeds: [],
  };

  const schema = yup
    .string()
    .required('Нужно ввести адрес RSS-ленты!')
    .url('Ссылка должна быть валидным URL!');

  const rssForm = document.getElementById('rssForm');
  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rssAdressFromUser = document.getElementById('newRSSAdress').value;
    schema.validate(rssAdressFromUser)
    // .then((value) => )
    .catch((err) => alert(err));
  });
};

app();

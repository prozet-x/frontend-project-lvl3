/* eslint-disable max-len */
/* eslint no-undef: "error" */
/* eslint-env browser */

// import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Подключаем бутстрап
import * as yup from 'yup';
import onChange from 'on-change';
import News from './classes/classNews'; // Это мой класс для хранения новостей
import Feeds from './classes/classFeeds'; // А это класс для хранения лент новостей
import renderStatus from './view';

const addingStatusPEl = document.getElementById('addingStatusMessage'); // Абзац. Содержит описание ошибки при попытке ввести адрес RSS-ленты
const inputRSSDivEl = document.getElementById('newRSSAdress'); // input. Сюда вводим новый адрес RSS-ленты

/* const renderStatus = (stateStatus, path, newValue) => { // Отрисовывает изменение статуса при вводе новой RSS-ленты
  if (path === 'status') { // Если поменялся статус (то есть, текст)
    addingStatusDivEl.textContent = newValue; // Покажем этот статус юзеру
    return; // и прекратим тут работать далее.
  }
  // Если тут оказались, значит у нас поменялся статус ошибки при вводе RSS-ленты
  if (newValue) { // Если ошибка есть, то
    inputRSSDivEl.classList.add('is-invalid'); // Подсветим красным инпут, в котороый вводили адрес RSS-ленты
    addingStatusDivEl.classList.remove('text-success'); // Текст статуса попытки добавления новой ленты сделаем не зеленым, ...
    addingStatusDivEl.classList.add('text-danger'); // ... а красным.
  } else { // Если ошибки не возникло. То есть, юзер успешно добавил RSS-ленту
    inputRSSDivEl.classList.remove('is-invalid'); // Инпут, в котороый вводили адрес RSS-ленты, красным перестаем подсвечивать
    addingStatusDivEl.classList.add('text-success'); // Текст статуса попытки добавления новой ленты сделаем зеленым, ...
    addingStatusDivEl.classList.remove('text-danger'); // ... а не красным
    inputRSSDivEl.value = ''; // Сам инпут чистим от текста
    inputRSSDivEl.focus(); // И снова даем этому инпуту фокус
  }
}; */

const render = (state, path, newValue, prevValue) => {
  // renderStatus(state.status);
};

const app = () => {
  const state = { // Это общий стейт приложения.
    feeds: new Feeds(), // Тут будут новостные ленты.
    status: { // Тут - статус попытки добавить новую ленту.
      status: '', // Содержит текст, который будет выведет при попытке добавить новую ленту.
      error: true, // Флаг ошибки. Если ввели неверный адрес RSS, то будет истиной. Если верный - ложью.
    },
    news: new News(), // Ну, а тут будут сами новости. По всем новостным лентам.
  };

  const notValidURLErrText = 'Ссылка должна быть валидным URL'; // Текст, который покажем, если пользователь ввел невалидный URL при попытке ввести адрес RSS-ленты
  const RSSAlreadyExistErrText = 'RSS уже существует'; // Это выведем текстом, если юзер пытается ввести RSS-ленту, которая уже была им добавлена
  const successAddedRSSText = 'RSS успешно загружен'; // Это выведем текстом, если юзер ввел RSS-ленту, и проблем при этом не возникло. То есть, он добавил новую, и все хорошо.

  const watchedStateFeeds = onChange(state.feeds, () => render(state));
  const watchedStateStatus = onChange(state.status, (path, newValue) => renderStatus(addingStatusPEl, inputRSSDivEl, state.status, path, newValue)); // Вотчер, следящий за статусом попытки добавления новой RSS-ленты юзером.
  const watchedStateNews = onChange(state.news, () => render(state));

  const schema = yup // Строим схему для проверки ввода пользователем адреса RSS-ленты
    .string() // Это должна быть строка, ...
    .url(notValidURLErrText) // ... это должен быть валидный URL, ...
    .notOneOf([state.feeds.urls], RSSAlreadyExistErrText); // ... не совпадающий ни с одним из ранее введенных

  const rssForm = document.getElementById('rssForm'); // Получим форму, в которую вводим адрес новой ленты.
  rssForm.addEventListener('submit', (e) => { // Навесим обработчик для этой формы на событие отправки
    e.preventDefault(); // Поведение по умолчанию прервем.
    schema.validate(inputRSSDivEl.value) // Проверим, все ли хорошо ввел юзер. Тут важно, что, если он ничего не ввел вообще, то есть, поле ввода совсем пустое, то ощибку ему покажет сам браузер, так как поле ввода обязательно. Это сделано средствами HTML.
      .then((value) => { // Если проблем не вылезло
        watchedStateFeeds.addNewFeed(value, 'TEST NAME'); // Это пока просто для теста
        watchedStateStatus.status = successAddedRSSText; // Статус меняем на 'мол все хорошо'
        watchedStateStatus.error = false; // Ошибки нет
      })
      .catch((err) => { // Если что-то пошло не так
        if (watchedStateStatus.status !== err.message) { // Если текст только что возникшей ошибки не совпадает с текстом ошибки, возникшей при предыдущей попытке добавления, то ...
          watchedStateStatus.status = err.message; // ... скинем в стейт текст ошибки
        }
        if (!watchedStateStatus.error) { // Если в стейте с прошлой попытки не указана ошибка, то ...
          watchedStateStatus.error = true; // ... укажем, что ошибка таки есть.
        }
      });
  });
};

app();

/* eslint-disable max-len */
// Отрисовывает изменение статуса при вводе новой RSS-ленты
// Параметры:
//   - addingStatusDivElParam - div для вывода статуса попытки добавления RSS-ленты
//   - inputRSSDivElParam - input, в который юзер ввел адрес RSS-ленты
//   - path - путь в стейте состояния, по которому произошли изменения
//   - newValue - то, что ввел пользователь
const renderStatus = (addingStatusDivElParam, inputRSSDivElParam, path, newValue) => {
  const addingStatusDivEl = addingStatusDivElParam; // Присваиваем параметр в переменную, так как линтер ругается на прямые манипуляции с параметрами.
  const inputRSSDivEl = inputRSSDivElParam; // -||-
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
};

export default renderStatus;

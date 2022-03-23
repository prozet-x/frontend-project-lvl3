/* eslint-disable max-len */
// Отрисовывает изменение статуса при вводе новой RSS-ленты
// Параметры:
//   - addingStatusPElParam - параграф для вывода статуса попытки добавления RSS-ленты
//   - inputRSSDivElParam - input, в который юзер ввел адрес RSS-ленты
//   - path - путь в стейте состояния, по которому произошли изменения
//   - newValue - то, что ввел пользователь
const renderStatus = (addingStatusPElParam, inputRSSDivElParam, path, newValue) => {
  const addingStatusPEl = addingStatusPElParam; // Присваиваем параметр в переменную, так как линтер ругается на прямые манипуляции с параметрами.
  const inputRSSDivEl = inputRSSDivElParam; // -||-
  if (path === 'text') { // Если поменялся статус (то есть, текст)
    addingStatusPEl.textContent = newValue; // Покажем этот статус юзеру
    return; // и прекратим тут работать далее.
  }
  // Если тут оказались, значит у нас поменялся статус ошибки при вводе RSS-ленты
  if (newValue) { // Если ошибка есть, то
    inputRSSDivEl.classList.add('is-invalid'); // Подсветим красным инпут, в котороый вводили адрес RSS-ленты
    addingStatusPEl.classList.remove('text-success'); // Текст статуса попытки добавления новой ленты сделаем не зеленым, ...
    addingStatusPEl.classList.add('text-danger'); // ... а красным.
  } else { // Если ошибки не возникло. То есть, юзер успешно добавил RSS-ленту
    inputRSSDivEl.classList.remove('is-invalid'); // Инпут, в котороый вводили адрес RSS-ленты, красным перестаем подсвечивать
    addingStatusPEl.classList.add('text-success'); // Текст статуса попытки добавления новой ленты сделаем зеленым, ...
    addingStatusPEl.classList.remove('text-danger'); // ... а не красным
    inputRSSDivEl.value = ''; // Сам инпут чистим от текста
    inputRSSDivEl.focus(); // И снова даем этому инпуту фокус
  }
};

const renderFormAvailability = (elements, isAvailable) => {
  if (isAvailable) {
    elements.foreach((elem) => elem.removeAttribute('disabled'));
  } else {
    elements.foreach((elem) => elem.setAttribute('disabled', ''));
  }
};

export { renderStatus, renderFormAvailability };

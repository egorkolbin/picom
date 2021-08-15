// Form to add drink receipt
export const addReceiptForm = document.querySelector('.add-form form');
export const addReceiptText = addReceiptForm.querySelector('textarea');

//Form to apply
export const applyForm = document.querySelector('.vacancy-form form');
export const applyText = applyForm.querySelector('textarea');

//Inputs
const receiptInputs = addReceiptForm.querySelectorAll('input');
export const applyInputs = applyForm.querySelectorAll('input');

//Выбирает все инпуты, кроме кнопки отправить
export const receiptInputsToFill = Array.from(receiptInputs).filter(
  (input) => input.type !== 'submit'
);
export const applyInputsToFill = Array.from(applyInputs).filter(
  (input) => input.type !== 'submit'
);

export function clearVacancyForm() {
  applyInputsToFill.forEach((input) => (input.value = ''));
  applyText.value = 'Напишите о себе...';
}

// Автозаполнение
try {
  receiptInputsToFill.forEach((input) => setToLocalStorage(input, 'receipt'));
} catch (err) {
  console.error(err);
}

try {
  applyInputsToFill.forEach((input) => setToLocalStorage(input, 'apply'));
} catch (err) {
  console.error(err);
}

//Убирает обозначение неверно при фокусе для инпутов
receiptInputsToFill.forEach((input) => {
  input.addEventListener('focus', () => removeInvalid(input));
});
applyInputsToFill.forEach((input) => {
  input.addEventListener('focus', () => removeInvalid(input));
});

// При фокусе убирает текстозаполнитель из поля добавить вариант напитка
addReceiptText.addEventListener('focus', () => {
  if (
    addReceiptText.value &&
    addReceiptText.value !== 'Напишите ваш вариант напитка...'
  )
    return;

  addReceiptText.value = '';
  removeInvalid(addReceiptText);
});

applyText.addEventListener('focus', () => {
  if (applyText.value && applyText.value !== 'Напишите о себе...') return;
  applyText.value = '';
  removeInvalid(applyText);
});

// При потере фокуса возвращает заполнитель
addReceiptText.addEventListener('blur', () => {
  if (addReceiptText.value) return;
  addReceiptText.value = 'Напишите ваш вариант напитка...';
});

applyText.addEventListener('blur', () => {
  if (applyText.value) return;
  applyText.value = 'Напишите о себе...';
});

//Добавляет класс неверно к инпуту
export function addInvalid(el) {
  setTimeout(() => {
    el.classList.add('invalid');
  }, 0);
}
//Удаляет класс неверно у инпута
export function removeInvalid(el) {
  if (!el.classList.contains('invalid')) return;
  el.classList.remove('invalid');
}
//Сохраняет введенные значения для автозаполнения
export function setToLocalStorage(input, prefix) {
  const localName = input.type[0].toUpperCase + input.type.slice(1);
  localStorage.setItem(`${prefix}${localName}`, input.value);
}

//Проверяет валидность данных в форме
export function checkData(inputs, text, defaultText) {
  isWrongData = false;

  inputs.forEach((input) => {
    if (!input.value) {
      isWrongData = true;
      addInvalid(input);
    }
    if (input.type === 'email') {
      if (input.value.includes('@')) return;
      isWrongData = true;
      addInvalid(input);
    }
  });

  if (text.value === defaultText || text.value === '') {
    isWrongData = true;
    addInvalid(text);
  }
}
//Обрабатывает данные в форме при попытке отправки
export function processForm(inputs, text, defaultText, prefix) {
  inputs.forEach((input) => removeInvalid(input));
  removeInvalid(text);
  checkData(inputs, text, defaultText);
  if (isWrongData) return;
  try {
    inputs.forEach((input) => setToLocalStorage(input, prefix));
  } catch (err) {
    console.error(err);
  }
}

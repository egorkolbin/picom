export const questionsForm = document.querySelector('.questions__form');
export const applyForm = document.querySelector('.apply-form');
export const popupApplyForm = document.querySelector('.apply-popup-form');
export const popupApply = document.querySelector('.apply__popup-form');

export const questionsInputs = questionsForm.querySelectorAll('input');
export const questionsText = questionsForm.querySelector('textarea');

export const applyInputs = applyForm.querySelectorAll('input');

export const popupApplyInputs = popupApplyForm.querySelectorAll('input');

export const questionsInputsToFill = Array.from(questionsInputs).filter(
  (input) => input.type !== 'submit'
);
export const applyInputsToFill = Array.from(applyInputs).filter(
  (input) => input.type !== 'submit'
);
export const popupApplyInputsToFill = Array.from(popupApplyInputs).filter(
  (input) => input.type !== 'submit'
);
//Перенести
try {
  questionsInputsToFill.forEach(
    (input) => (input.value = getFromLocalStorage(input, 'receipt'))
  );
} catch (err) {
  console.error(err);
}
try {
  applyInputsToFill.forEach(
    (input) => (input.value = getFromLocalStorage(input, 'apply-franchize'))
  );
} catch (err) {
  console.error(err);
}
try {
  popupApplyInputsToFill.forEach((input) =>
    getFromLocalStorage(input, 'apply-franchize')
  );
} catch (err) {
  console.error(err);
}

questionsInputsToFill.forEach((input) => {
  input.addEventListener('focus', () => removeInvalid(input));
});
applyInputsToFill.forEach((input) => {
  input.addEventListener('focus', () => removeInvalid(input));
});
popupApplyInputsToFill.forEach((input) => {
  input.addEventListener('focus', () => removeInvalid(input));
});

questionsText.addEventListener('focus', () => removeInvalid(questionsText));
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
  const localName = input.type[0].toUpperCase() + input.type.slice(1);
  localStorage.setItem(`${prefix}${localName}`, input.value);
}
function getFromLocalStorage(input, prefix) {
  const localName = input.type[0].toUpperCase() + input.type.slice(1);
  return localStorage.getItem(`${prefix}${localName}`);
}
//Проверяет валидность данных в форме
function checkData(inputs, text, defaultText) {
  let isWrongData = false;

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

  if (text && (text.value === defaultText || text.value === '')) {
    isWrongData = true;
    addInvalid(text);
  }
  return isWrongData;
}
//Обрабатывает данные в форме при попытке отправки
export function processForm(inputs, text, defaultText) {
  inputs.forEach((input) => {
    removeInvalid(input);
  });

  if (text) removeInvalid(text);
  const isWrongData = checkData(inputs, text, defaultText);
  return isWrongData;
}

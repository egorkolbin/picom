import {
  clearVacancyForm,
  applyInputsToFill,
  applyText,
  removeInvalid,
} from './form-helpers.js';

export const overlay = document.querySelector('.overlay');
// Popups
export const applyPopup = document.querySelector('.announce.apply');
export const addReceiptPopup = document.querySelector('.announce.add');
export const errorPopup = document.querySelector('.announce.error');
const popups = document.querySelectorAll('.popup');

//Вспомогательные функции
//Показывает попап
export function showPopup(popup) {
  popup.classList.remove('hidden');
  overlay.classList.remove('hidden');
  overlay.classList.remove('invisible');
  setTimeout(() => {
    popup.classList.remove('invisible');
  }, 0);
}
//Закрывает все попапы
export function closeAllPopups() {
  clearVacancyForm();
  applyInputsToFill.forEach((input) => removeInvalid(input));
  removeInvalid(applyText);

  popups.forEach((popup) => {
    if (popup.classList.contains('hidden')) return;
    popup.classList.add('invisible');
    clearPopupStyles(popup);

    overlay.classList.add('invisible');
    overlay.classList.add('hidden');
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 200);
  });
}
//Убирает стили попапов (для раздела вакансии)
export function clearPopupStyles(el) {
  if (el === addReceiptPopup) return;
  const stylePrefix = 'popup-';
  el.classList.forEach((className) => {
    if (className.startsWith(stylePrefix)) el.classList.remove(className);
  });
  const buttonInputToClear = el.querySelector('.form_submit');
  const buttonToClear = el.querySelector('button');
  if (buttonInputToClear) clearButtonStyle(buttonInputToClear);
  if (buttonToClear) clearButtonStyle(buttonToClear);
}
//Убирает стили кнопок (для раздела вакансии)
export function clearButtonStyle(button) {
  if (button.classList.contains('orange_button'))
    button.classList.remove('orange_button');
  if (button.classList.contains('white_button-dark'))
    button.classList.remove('white_button-dark');
}

import {
  showPopup,
  closeAllPopups,
  applyPopup,
  addReceiptPopup,
  errorPopup,
} from './popup-helpers.js';
import {
  addReceiptForm,
  applyForm,
  receiptInputsToFill,
  applyInputsToFill,
  addReceiptText,
  applyText,
  processForm,
  setToLocalStorage,
} from './form-helpers.js';
import { buttonCloseApply, buttonCloseError } from './popups.js';

let sendData;

// Отправка формы через AJAX

window.addEventListener('load', function () {
  sendData = function (form, popup) {
    const XHR = new XMLHttpRequest();

    const FD = new FormData(form);

    //Вставить реальный адрес!
    XHR.open('POST', 'https://yum-yum-coffee.picom.su/');
    XHR.timeout = 3000;

    XHR.addEventListener('load', function () {
      if (XHR.status === 200) showPopup(popup);
      else showPopup(errorPopup);
    });
    XHR.addEventListener('error', () => {
      showPopup(errorPopup);
    });
    XHR.addEventListener('timeout', () => {
      showPopup(errorPopup);
      console.log('Timed out!');
    });

    XHR.send(FD);
  };
});

// При отправке формы

addReceiptForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const isWrongData = processForm(
    receiptInputsToFill,
    addReceiptText,
    'Напишите ваш вариант напитка...'
  );
  if (isWrongData) return;

  try {
    receiptInputsToFill.forEach((input) => setToLocalStorage(input, 'receipt'));
  } catch (err) {
    console.error(err);
  }
  //Показывает попап
  addReceiptPopup.classList.add('popup-barista');
  errorPopup.classList.add('popup-barista');
  buttonCloseError.classList.add('orange_button');
  sendData(this, addReceiptPopup);
});

applyForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const isWrongData = processForm(
    applyInputsToFill,
    applyText,
    'Напишите о себе...'
  );
  if (isWrongData) return;
  try {
    applyInputsToFill.forEach((input) => setToLocalStorage(input, 'apply'));
  } catch (err) {
    console.error(err);
  }
  const popupStyle = applyFormPopup.classList.contains('popup-barista')
    ? 'popup-barista'
    : 'popup-guest';
  const buttonStyle =
    popupStyle === 'popup-barista' ? 'orange_button' : 'white_button-dark';

  applyPopup.classList.add(popupStyle);
  buttonCloseApply.classList.add(buttonStyle);
  errorPopup.classList.add(popupStyle);
  buttonCloseError.classList.add(buttonStyle);
  closeAllPopups();

  sendData(this, applyPopup);
});

// Barista Popup
const buttonBarista = document.querySelector('.barista_button');
const buttonGuest = document.querySelector('.guest_button');

const applyFormPopup = document.querySelector('.vacancy-form');
const buttonApply = applyForm.querySelector('.form_submit');

buttonBarista.addEventListener('click', () => {
  applyFormPopup.classList.add('popup-barista');
  buttonApply.classList.add('orange_button');
  showPopup(applyFormPopup);
});

buttonGuest.addEventListener('click', () => {
  applyFormPopup.classList.add('popup-guest');
  buttonApply.classList.add('white_button-dark');
  showPopup(applyFormPopup);
});

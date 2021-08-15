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
} from './form-helpers.js';
import { buttonCloseApply, buttonCloseError } from './popups.js';
import { createTelTemplate } from './phone-input.js';

let sendData;

// Отправка формы через AJAX

window.addEventListener('load', function () {
  sendData = function (form, popup) {
    const XHR = new XMLHttpRequest();

    const FD = new FormData(form);

    XHR.open('POST', 'https://yum-yum-coffee.picom.su/');
    XHR.send(FD);

    XHR.addEventListener('load', function (event) {
      closeAllPopups();
      if (XHR.status != 200) showPopup(errorPopup);
      else showPopup(popup);
    });

    XHR.addEventListener('error', () => {
      showPopup(errorPopup);
    });
  };
});

// При отправке формы

addReceiptForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  processForm(
    receiptInputsToFill,
    addReceiptText,
    'Напишите ваш вариант напитка...',
    'receipt'
  );
  if (isWrongData) return;

  //Показывает попап
  addReceiptPopup.classList.add('popup-barista');
  errorPopup.classList.add('popup-barista');
  buttonCloseError.classList.add('orange_button');
  sendData(this, addReceiptPopup);
});

applyForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  processForm(applyInputsToFill, applyText, 'Напишите о себе...', 'apply');
  if (isWrongData) return;

  const popupStyle = applyFormPopup.classList.contains('popup-barista')
    ? 'popup-barista'
    : 'popup-guest';
  const buttonStyle =
    popupStyle === 'popup-barista' ? 'orange_button' : 'white_button-dark';

  closeAllPopups();

  applyPopup.classList.add(popupStyle);
  buttonCloseApply.classList.add(buttonStyle);
  errorPopup.classList.add(popupStyle);
  buttonCloseError.classList.add(buttonStyle);

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

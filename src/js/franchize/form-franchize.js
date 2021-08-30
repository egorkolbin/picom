import {
  showPopup,
  questionPopup,
  applyPopup,
  errorPopup,
  closeAllPopups,
} from "./popup-helpers-franchize.js";

import {
  questionsForm,
  questionsInputsToFill,
  questionsText,
  applyForm,
  applyInputsToFill,
  popupApplyForm,
  popupApply,
  popupApplyInputsToFill,
  processForm,
  setToLocalStorage,
} from "./form-helpers-franchize.js";

import {
  buttonCloseError,
  buttonCloseQuestion,
  buttonCloseApply,
  popupApplyButtons,
} from "./popups-franchize.js";

let sendData;

// Отправка формы через AJAX

window.addEventListener("load", function () {
  sendData = function (form, popup) {
    const XHR = new XMLHttpRequest();

    const FD = new FormData(form);

    //Вставить реальный адрес!
    XHR.open("POST", "https://yum-yum-coffee.picom.su/");
    XHR.timeout = 3000;

    XHR.addEventListener("load", function () {
      if (XHR.status === 200) showPopup(popup);
      else showPopup(errorPopup);
    });
    XHR.addEventListener("error", () => {
      showPopup(errorPopup);
    });
    XHR.addEventListener("timeout", () => {
      showPopup(errorPopup);
      console.log("Timed out!");
    });

    XHR.send(FD);
  };
});

//При отправке формы
questionsForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const isWrongData = processForm(questionsInputsToFill, questionsText, "");
  if (isWrongData) return;

  try {
    questionsInputsToFill.forEach((input) =>
      setToLocalStorage(input, "questions")
    );
  } catch (err) {
    console.error(err);
  }
  //Показывает попап
  questionPopup.classList.add("popup-dark");
  errorPopup.classList.add("popup-dark");
  buttonCloseError.classList.add("dark-btn");
  buttonCloseQuestion.classList.add("dark-btn");
  sendData(this, questionPopup);
});

applyForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const isWrongData = processForm(applyInputsToFill, false, "");
  if (isWrongData) return;

  try {
    applyInputsToFill.forEach((input) =>
      setToLocalStorage(input, "apply-franchize")
    );
  } catch (err) {
    console.error(err);
  }
  //Показывает попап
  applyPopup.classList.add("popup-dark");
  errorPopup.classList.add("popup-dark");

  buttonCloseError.classList.add("dark-btn");
  buttonCloseApply.classList.add("dark-btn");
  sendData(this, applyPopup);
});

popupApplyForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const isWrongData = processForm(popupApplyInputsToFill, false, "");
  if (isWrongData) return;

  try {
    popupApplyInputsToFill.forEach((input) =>
      setToLocalStorage(input, "apply-franchize")
    );
  } catch (err) {
    console.error(err);
  }
  closeAllPopups();
  //Показывает попап
  applyPopup.classList.add("popup-light");
  errorPopup.classList.add("popup-light");

  buttonCloseError.classList.add("orange-btn");
  buttonCloseApply.classList.add("orange-btn");
  sendData(this, applyPopup);
});

popupApplyButtons.forEach((button) =>
  button.addEventListener("click", function () {
    showPopup(popupApply);
  })
);

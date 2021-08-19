import {
  showPopup,
  closeAllPopups,
  thanksPopup,
  errorPopup,
  trainingPopup,
  signUpPopup,
} from "./event-popup-helpers.js";
import {
  trainingForm,
  signUpForm,
  processForm,
  setToLocalStorage,
  trainingInputsToFill,
  signUpInputsToFill,
} from "./event-form-helpers.js";
// import { buttonCloseApply, buttonCloseError } from "./event-popups.js";

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

// При отправке формы

trainingForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const isWrongData = processForm(trainingInputsToFill, false, "");
  if (isWrongData) return;

  try {
    trainingInputsToFill.forEach((input) =>
      setToLocalStorage(input, "training")
    );
  } catch (err) {
    console.error(err);
  }
  closeAllPopups();
  sendData(this, thanksPopup);
});

signUpForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const isWrongData = processForm(signUpInputsToFill, false, "");
  if (isWrongData) return;
  try {
    signUpInputsToFill.forEach((input) => setToLocalStorage(input, "signup"));
  } catch (err) {
    console.error(err);
  }

  closeAllPopups();

  sendData(this, thanksPopup);
});

const datesForm = document.querySelector(".date-form");
datesForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  showPopup(trainingPopup);
});

const downloadButton = document.querySelector(".download_button");
downloadButton.addEventListener("click", function () {
  showPopup(signUpPopup);
});

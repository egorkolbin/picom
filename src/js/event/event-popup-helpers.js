import {
  trainingInputsToFill,
  signUpInputsToFill,
  removeInvalid,
} from "./event-form-helpers.js";

export const overlay = document.querySelector(".overlay");
// Popups
export const thanksPopup = document.querySelector(".announce.thanks");
export const errorPopup = document.querySelector(".announce.error");
export const trainingPopup = document.querySelector(".training-form");
export const signUpPopup = document.querySelector(".signup-form");

const popups = document.querySelectorAll(".popup");

//Вспомогательные функции
//Показывает попап
export function showPopup(popup) {
  popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
  overlay.classList.remove("invisible");
  setTimeout(() => {
    popup.classList.remove("invisible");
  }, 0);
}
//Закрывает все попапы
export function closeAllPopups() {
  trainingInputsToFill.forEach((input) => removeInvalid(input));
  signUpInputsToFill.forEach((input) => removeInvalid(input));

  popups.forEach((popup) => {
    if (popup.classList.contains("hidden")) return;
    popup.classList.add("invisible");

    overlay.classList.add("invisible");
    overlay.classList.add("hidden");
    setTimeout(() => {
      popup.classList.add("hidden");
    }, 200);
  });
}

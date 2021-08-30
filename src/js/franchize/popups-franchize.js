import {
  closeAllPopups,
  overlay,
  questionPopup,
  applyPopup,
  errorPopup,
} from "./popup-helpers-franchize.js";

export const popupCloseButtons = document.querySelectorAll(".announce_button");
export const buttonCloseQuestion =
  questionPopup.querySelector(".announce_button");
export const buttonCloseApply = applyPopup.querySelector(".announce_button");
export const buttonCloseError = errorPopup.querySelector(".announce_button");
export const popupApplyButtons = document.querySelectorAll(".open-popup");

//Закрывает все попапы при нажатии по оверлею
overlay.addEventListener("click", closeAllPopups);

//Закрывает попапы при нажатии escape
document.addEventListener("keydown", (evt) => {
  if (evt.key !== "Escape") return;
  closeAllPopups();
});
//Закрывает попапы при нажатии на кнопку окей (в попапах после форм)
popupCloseButtons.forEach((button) =>
  button.addEventListener("click", closeAllPopups)
);

import {
  closeAllPopups,
  overlay,
  thanksPopup,
  errorPopup,
} from "./event-popup-helpers.js";

export const popupCloseButtons = document.querySelectorAll(".announce_button");
export const buttonCloseThanks = thanksPopup.querySelector(".announce_button");
export const buttonCloseError = errorPopup.querySelector(".announce_button");

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

export const overlay = document.querySelector(".overlay");

export const questionPopup = document.querySelector(".announce.question");
export const applyPopup = document.querySelector(".announce.apply");
export const errorPopup = document.querySelector(".announce.error");
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
  popups.forEach((popup) => {
    if (popup.classList.contains("hidden")) return;
    popup.classList.add("invisible");
    clearPopupStyles(popup);

    overlay.classList.add("invisible");
    overlay.classList.add("hidden");
    setTimeout(() => {
      popup.classList.add("hidden");
    }, 200);
  });
}
//Убирает стили попапов (для раздела заявка на франшизу)
export function clearPopupStyles(el) {
  const stylePrefix = "popup-";
  el.classList.forEach((className) => {
    if (className.startsWith(stylePrefix)) el.classList.remove(className);
  });
  const buttonToClear = el.querySelector("button");
  if (buttonToClear) clearButtonStyle(buttonToClear);
}
//Убирает стили кнопок
export function clearButtonStyle(button) {
  if (button.classList.contains("orange-btn"))
    button.classList.remove("orange-btn");
  if (button.classList.contains("dark-btn"))
    button.classList.remove("dark-btn");
}

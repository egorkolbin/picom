export const trainingForm = document.querySelector(".training-form form");
export const signUpForm = document.querySelector(".signup-form form");

//Inputs
const trainingInputs = trainingForm.querySelectorAll("input");
const signUpInputs = signUpForm.querySelectorAll("input");

//Выбирает все инпуты, кроме кнопки отправить
export const trainingInputsToFill = Array.from(trainingInputs).filter(
  (input) => input.type !== "submit"
);
export const signUpInputsToFill = Array.from(signUpInputs).filter(
  (input) => input.type !== "submit"
);

// Автозаполнение
try {
  trainingInputsToFill.forEach((input) =>
    getFromLocalStorage(input, "training")
  );
} catch (err) {
  console.error(err);
}

try {
  signUpInputsToFill.forEach((input) => getFromLocalStorage(input, "signup"));
} catch (err) {
  console.error(err);
}

//Убирает обозначение неверно при фокусе для инпутов
trainingInputsToFill.forEach((input) => {
  input.addEventListener("focus", () => removeInvalid(input));
});
signUpInputsToFill.forEach((input) => {
  input.addEventListener("focus", () => removeInvalid(input));
});

//Добавляет класс неверно к инпуту
export function addInvalid(el) {
  setTimeout(() => {
    el.classList.add("invalid");
  }, 0);
}
//Удаляет класс неверно у инпута
export function removeInvalid(el) {
  if (!el.classList.contains("invalid")) return;
  el.classList.remove("invalid");
}
//Сохраняет введенные значения для автозаполнения
export function setToLocalStorage(input, prefix) {
  const localName = input.type[0].toUpperCase + input.type.slice(1);
  localStorage.setItem(`${prefix}${localName}`, input.value);
}
function getFromLocalStorage(input, prefix) {
  const localName = input.type[0].toUpperCase + input.type.slice(1);
  localStorage.getItem(`${prefix}${localName}`);
}

//Проверяет валидность данных в форме
export function checkData(inputs, text, defaultText) {
  let isWrongData = false;

  inputs.forEach((input) => {
    if (!input.value) {
      isWrongData = true;
      addInvalid(input);
    }
    if (input.type === "email") {
      if (input.value.includes("@")) return;
      isWrongData = true;
      addInvalid(input);
    }
  });

  if (text && (text.value === defaultText || text.value === "")) {
    isWrongData = true;
    addInvalid(text);
  }
  return isWrongData;
}
//Обрабатывает данные в форме при попытке отправки
export function processForm(inputs, text, defaultText) {
  inputs.forEach((input) => removeInvalid(input));
  if (text) removeInvalid(text);
  const isWrongData = checkData(inputs, text, defaultText);
  return isWrongData;
}

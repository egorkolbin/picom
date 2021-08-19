const questionsList = document.querySelector(".questions__items");
const questionsItems = document.querySelectorAll(".questions__item");
questionsList.addEventListener("click", function (evt) {
  const questionsItem = evt.target.closest(".questions__item");
  if (!questionsItem) return;

  if (!questionsItem.classList.contains("active")) {
    questionsItems.forEach((item) => {
      if (item.classList.contains("active")) item.classList.remove("active");
    });
    questionsItem.classList.add("active");
  } else {
    questionsItem.classList.remove("active");
  }
});

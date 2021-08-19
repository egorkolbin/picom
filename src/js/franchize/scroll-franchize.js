// Scrolling To Sections

const navigation = document.querySelector("nav .menu_list");

const footerNav = document.querySelector(".footer_menu-list");

navigation.addEventListener("click", function (evt) {
  scroll(evt, "menu_link");
});
footerNav.addEventListener("click", function (evt) {
  scroll(evt, "footer_menu-link");
});

function scroll(evt, className) {
  if (!evt.target.classList.contains(className)) return;
  evt.preventDefault();
  const sectionName = evt.target.href.split("#");
  const sectionId = sectionName[sectionName.length - 1];
  const sectionScrollTo = document.querySelector(`#${sectionId}`);
  sectionScrollTo.scrollIntoView({ behavior: "smooth" });
}

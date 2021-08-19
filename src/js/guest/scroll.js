// Scrolling To Sections

const navigation = document.querySelector('nav .menu_list');
const buttonToMenu = document.querySelector('.intro_button');
const menuSection = document.querySelector('.content-menu');
const footerNav = document.querySelector('.footer_menu-list');

navigation.addEventListener('click', function (evt) {
  scroll(evt, 'menu_link');
});
footerNav.addEventListener('click', function (evt) {
  scroll(evt, 'footer_menu-link');
});

function scroll(evt, className) {
  if (!evt.target.classList.contains(className)) return;
  evt.preventDefault();
  const sectionName = evt.target.href.split('#');
  const sectionId = sectionName[sectionName.length - 1];
  const sectionScrollTo = document.querySelector(`#${sectionId}`);
  sectionScrollTo.scrollIntoView({ behavior: 'smooth' });
}

buttonToMenu.addEventListener('click', function (evt) {
  evt.preventDefault();
  menuSection.scrollIntoView({ behavior: 'smooth' });
});

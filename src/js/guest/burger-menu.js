const burgerMenu = document.querySelector('.burger-menu');
const menuList = document.querySelector('header .menu_list');
const contacts = document.querySelector('header .contacts');

const toAddActiveClass = [burgerMenu, menuList, contacts];
burgerMenu.addEventListener('click', function () {
  toAddActiveClass.forEach((el) => el.classList.toggle('active'));
});

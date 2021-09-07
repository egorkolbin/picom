import { overlay } from './popup-helpers.js';
import { isStickyHeader } from './sticky-header.js';
const header = document.querySelector('header');
const burgerMenu = document.querySelector('.burger-menu');
const menuList = header.querySelector('.menu_list');
const contacts = header.querySelector('.contacts');

const toAddActiveClass = [burgerMenu, menuList, contacts];

burgerMenu.addEventListener('click', function () {
  if (!burgerMenu.classList.contains('active')) {
    header.style.zIndex = 6;
    header.classList.add('sticky');
  } else if (isStickyHeader) {
    header.style.zIndex = 4;
  } else {
    header.classList.remove('sticky');
    header.style.zIndex = 4;
  }
  toAddActiveClass.forEach((el) => el.classList.toggle('active'));

  overlay.classList.toggle('hidden');
  overlay.classList.toggle('invisible');
});

overlay.addEventListener('click', function () {
  if (burgerMenu.classList.contains('active')) {
    header.style.zIndex = 4;
    toAddActiveClass.forEach((el) => el.classList.remove('active'));

    overlay.classList.add('hidden');
    overlay.classList.add('invisible');
  }
});

// import $ from 'jquery';

// import 'slick-carousel';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// $('.about-slides').slick({ accessibility: true, arrows: false });

// $('.menu-slides').slick({
//   accessibility: true,
//   arrows: false,
//   adaptiveHeight: true,
// });

// $('.about_menu-item').on('click', function (e) {
//   changeWhenClicking(e, '.about_menu-item', '.about-slides');
// });

// $('.about-slides').on('afterChange', function (e) {
//   changeWhenSwiping(e, '.about_menu-item');
// });

// $('.content-menu_item').on('click', function (e) {
//   changeWhenClicking(e, '.content-menu_item', '.menu-slides');
// });

// $('.menu-slides').on('afterChange', function (e) {
//   changeWhenSwiping(e, '.content-menu_item');
// });

// function changeWhenClicking(evt, linksList, slidesName) {
//   const $slideNum = $(evt.target).data('nav');
//   const $prevActive = $(`${linksList}.active`);
//   $prevActive.removeClass('active');
//   const $newActive = $(`${linksList}[data-nav="${$slideNum}"]`);
//   $newActive.addClass('active');
//   $(slidesName).slick('slickGoTo', $slideNum);
// }

// function changeWhenSwiping(evt, linksList) {
//   const $slideNum = $(evt.target).slick('slickCurrentSlide');
//   $(linksList).removeClass('active');
//   const $newActive = $(`${linksList}[data-nav="${$slideNum}"]`);
//   $newActive.addClass('active');
// }

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

// Section Revealing

const sections = document.querySelectorAll('main section');

function revealSection(entries, observer) {
  //   const [entry] = entries;
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
  });
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});

// Cup Shaking
const cupToShake = document.querySelector('.advantages_cup img');
const advantagesSection = document.querySelector('.advantages');

function shakeCup(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  cupToShake.classList.add('shake-img');
}

const cupObserver = new IntersectionObserver(shakeCup, {
  root: null,
  threshold: 0.4,
});

cupObserver.observe(advantagesSection);

// Form to add drink receipt
const addReceiptForm = document.querySelector('.add-form form');
const addReceiptText = addReceiptForm.querySelector('textarea');
const addReceiptButton = addReceiptForm.querySelector('input[type="submit');
const addReceiptName = addReceiptForm.querySelector('#name');
const addReceiptPhone = addReceiptForm.querySelector('#number');

const receiptInputs = addReceiptForm.querySelectorAll('input');

let isWrongData;
let sendData;

//Form to apply
const applyFormPopup = document.querySelector('.vacancy-form');
const applyForm = document.querySelector('.vacancy-form form');
const applyInputs = applyForm.querySelectorAll('input');
const applyText = applyForm.querySelector('textarea');
const buttonApply = applyForm.querySelector('.form_submit');

//Popups
const addReceiptPopup = document.querySelector('.announce.add');
const applyPopup = document.querySelector('.announce.apply');

const popupCloseButtons = document.querySelectorAll('.announce_button');
const buttonCloseApply = applyPopup.querySelector('.announce_button');

//Выбирает все инпуты, кроме кнопки отправить
const receiptInputsToFill = Array.from(receiptInputs).filter(
  (input) => input.type !== 'submit'
);
const applyInputsToFill = Array.from(applyInputs).filter(
  (input) => input.type !== 'submit'
);

// Автозаполнение
try {
  receiptInputsToFill.forEach((input) => setToLocalStorage(input, 'receipt'));
} catch (err) {
  console.error(err);
}

try {
  applyInputsToFill.forEach((input) => setToLocalStorage(input, 'apply'));
} catch (err) {
  console.error(err);
}

// При фокусе убирает текстозаполнитель из поля добавить вариант напитка
addReceiptText.addEventListener('focus', () => {
  if (
    addReceiptText.value &&
    addReceiptText.value !== 'Напишите ваш вариант напитка...'
  )
    return;

  addReceiptText.value = '';
  removeInvalid(addReceiptText);
});

applyText.addEventListener('focus', () => {
  if (applyText.value && applyText.value !== 'Напишите о себе...') return;
  console.log('setting value');
  applyText.value = '';
  removeInvalid(applyText);
});

// При потере фокуса возвращает заполнитель
addReceiptText.addEventListener('blur', () => {
  if (addReceiptText.value) return;
  addReceiptText.value = 'Напишите ваш вариант напитка...';
});

applyText.addEventListener('blur', () => {
  if (applyText.value) return;
  applyText.value = 'Напишите о себе...';
});

// Отправка формы через AJAX

window.addEventListener('load', function () {
  sendData = function (form, popup) {
    const XHR = new XMLHttpRequest();

    const FD = new FormData(form);

    XHR.addEventListener('load', function (event) {
      console.log(event.target.responseText);
    });

    XHR.addEventListener('error', (error) => {
      console.log('error while loading');
      //   showPopup(popup-error);
    });

    try {
      XHR.open('POST', 'http://yum-yum-coffee.picom.su/');
      XHR.send(FD);
      showPopup(popup);
    } catch (err) {
      console.log('error while sending');
    }
  };
});

//Вспомогательные функции
function addInvalid(el) {
  setTimeout(() => {
    el.classList.add('invalid');
  }, 0);
}
function removeInvalid(el) {
  if (!el.classList.contains('invalid')) return;
  el.classList.remove('invalid');
}
function setToLocalStorage(input, prefix) {
  const localName = input.type[0].toUpperCase + input.type.slice(1);
  localStorage.setItem(`${prefix}${localName}`, input.value);
}
function checkData(inputs, text, defaultText) {
  isWrongData = false;

  inputs.forEach((input) => {
    if (!input.value) {
      isWrongData = true;
      addInvalid(input);
    }
  });

  if (text.value === defaultText || text.value === '') {
    isWrongData = true;
    addInvalid(text);
  }
}
function processForm(inputs, text, defaultText, prefix) {
  inputs.forEach((input) => removeInvalid(input));
  removeInvalid(text);
  checkData(inputs, text, defaultText);
  if (isWrongData) return;
  try {
    inputs.forEach((input) => setToLocalStorage(input, prefix));
  } catch (err) {
    console.error(err);
  }
}

// При отправке формы

addReceiptForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  processForm(
    receiptInputsToFill,
    addReceiptText,
    'Напишите ваш вариант напитка...',
    'receipt'
  );
  if (isWrongData) return;

  //Показывает попап
  addReceiptPopup.classList.add('popup-barista');
  sendData(this, addReceiptPopup);
});

applyForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  processForm(applyInputsToFill, applyText, 'Напишите о себе...', 'apply');
  if (isWrongData) return;

  const popupStyle = applyFormPopup.classList.contains('popup-barista')
    ? 'popup-barista'
    : 'popup-guest';
  const buttonStyle =
    popupStyle === 'popup-barista' ? 'orange_button' : 'white_button-dark';

  closeAllPopups();

  applyPopup.classList.add(popupStyle);
  buttonCloseApply.classList.add(buttonStyle);

  sendData(this, applyPopup);
});

//Убирает обозначение неверно при фокусе для инпутов
receiptInputsToFill.forEach((input) => {
  input.addEventListener('focus', () => removeInvalid(input));
});
applyInputsToFill.forEach((input) => {
  input.addEventListener('focus', () => removeInvalid(input));
});

// Popups
const popups = document.querySelectorAll('.popup');
const overlay = document.querySelector('.overlay');

//Показывает попап
function showPopup(popup) {
  popup.classList.remove('hidden');
  overlay.classList.remove('hidden');
  overlay.classList.remove('invisible');
  setTimeout(() => {
    popup.classList.remove('invisible');
  }, 0);
}

//Закрывает все попапы
overlay.addEventListener('click', closeAllPopups);

document.addEventListener('keydown', (evt) => {
  if (evt.key !== 'Escape') return;
  closeAllPopups();
});

popupCloseButtons.forEach((button) =>
  button.addEventListener('click', closeAllPopups)
);

function closeAllPopups() {
  popups.forEach((popup) => {
    if (popup.classList.contains('hidden')) return;
    popup.classList.add('invisible');
    clearPopupStyles(popup);

    overlay.classList.add('invisible');
    overlay.classList.add('hidden');
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 200);
  });
}

function clearPopupStyles(el) {
  if (el === addReceiptPopup) return;
  const stylePrefix = 'popup-';
  el.classList.forEach((className) => {
    if (className.startsWith(stylePrefix)) el.classList.remove(className);
  });
  const buttonInputToClear = el.querySelector('.form_submit');
  const buttonToClear = el.querySelector('button');
  if (buttonInputToClear) clearButtonStyle(buttonInputToClear);
  if (buttonToClear) clearButtonStyle(buttonToClear);
}

function clearButtonStyle(button) {
  if (button.classList.contains('orange_button'))
    button.classList.remove('orange_button');
  if (button.classList.contains('white_button-dark'))
    button.classList.remove('white_button-dark');
}

// Barista Popup
const buttonBarista = document.querySelector('.barista_button');
const buttonGuest = document.querySelector('.guest_button');

buttonBarista.addEventListener('click', () => {
  applyFormPopup.classList.add('popup-barista');
  buttonApply.classList.add('orange_button');
  showPopup(applyFormPopup);
});

buttonGuest.addEventListener('click', () => {
  applyFormPopup.classList.add('popup-guest');
  buttonApply.classList.add('white_button-dark');
  showPopup(applyFormPopup);
});

//Map

'use strict';

// Scrolling To Sections

const navigation = document.querySelector('nav .menu_list');
const buttonToMenu = document.querySelector('.intro_button');
const menuSection = document.querySelector('.content-menu');

navigation.addEventListener('click', function (evt) {
  if (!evt.target.classList.contains('menu_link')) return;
  evt.preventDefault();
  const sectionName = evt.target.href.split('#');
  const sectionId = sectionName[sectionName.length - 1];
  const sectionScrollTo = document.querySelector(`#${sectionId}`);
  sectionScrollTo.scrollIntoView({ behavior: 'smooth' });
});

buttonToMenu.addEventListener('click', function (evt) {
  evt.preventDefault();
  menuSection.scrollIntoView({ behavior: 'smooth' });
});

// Section Revealing

const sections = document.querySelectorAll('main section');

function revealSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
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

const inputsToFill = Array.from(receiptInputs).filter(
  (input) => input.type !== 'submit'
);

try {
  inputsToFill.forEach((input) => {
    const localName = input.type[0].toUpperCase + input.type.slice(1);
    input.value = localStorage.getItem(`receipt${localName}`);
  });
} catch (err) {
  console.error(err);
}

addReceiptText.addEventListener('focus', () => {
  if (
    addReceiptText.value &&
    addReceiptText.value !== 'Напишите ваш вариант напитка...'
  )
    return;

  addReceiptText.value = '';
  addReceiptText.classList.contains('invalid')
    ? addReceiptText.classList.remove('invalid')
    : '';
});

addReceiptText.addEventListener('blur', () => {
  if (addReceiptText.value) return;
  addReceiptText.value = 'Напишите ваш вариант напитка...';
});

addReceiptForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  inputsToFill.forEach((input) => {
    if (!input.value) {
      //   evt.preventDefault();
      input.classList.add('invalid');
      return;
    }
  });

  if (
    addReceiptText.value === 'Напишите ваш вариант напитка...' ||
    addReceiptText.value === ''
  ) {
    // evt.preventDefault();
    addReceiptText.classList.add('invalid');
    return;
  }

  try {
    inputsToFill.forEach((input) => {
      const localName = input.type[0].toUpperCase + input.type.slice(1);
      localStorage.setItem(`receipt${localName}`, input.value);
    });
  } catch (err) {
    console.error(err);
  }

  addReceiptPopup.classList.add('popup-barista');
  showPopup(addReceiptPopup);
});

inputsToFill.forEach((input) =>
  input.addEventListener('focus', () => {
    if (!input.classList.contains('invalid')) return;
    input.classList.remove('invalid');
  })
);

// vacancyFormPopup.classList.add('popup-barista');
// addReceiptForm.addEventListener('submit', (event) => {
//   event.preventDefault();
// });

// Popups
const popups = document.querySelectorAll('.popup');
const addReceiptPopup = document.querySelector('.announce.add');
const overlay = document.querySelector('.overlay');

const vacancyFormPopup = document.querySelector('.vacancy-form');
const buttonApply = vacancyFormPopup.querySelector('.form_submit');

overlay.addEventListener('click', closeAllPopups);
document.addEventListener('keydown', (evt) => {
  if (evt.key !== 'Escape') return;
  closeAllPopups();
});

function closeAllPopups() {
  popups.forEach((popup) => {
    console.log(popup);
    if (popup.classList.contains('hidden')) return;
    popup.classList.add('invisible');

    if (popup.classList.contains('popup-barista')) {
      popup.classList.remove('popup-barista');
      buttonApply.classList.remove('orange_button');
    }

    if (popup.classList.contains('popup-guest')) {
      popup.classList.remove('popup-guest');
      buttonApply.classList.remove('white_button-dark');
    }

    setTimeout(() => {
      popup.classList.add('hidden');
      overlay.classList.add('invisible');
    }, 200);
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
  });
}

// Barista Popup
const buttonBarista = document.querySelector('.barista_button');
const buttonGuest = document.querySelector('.guest_button');

buttonBarista.addEventListener('click', () => {
  vacancyFormPopup.classList.add('popup-barista');
  buttonApply.classList.add('orange_button');
  showPopup(vacancyFormPopup);
});

buttonGuest.addEventListener('click', () => {
  vacancyFormPopup.classList.add('popup-guest');
  buttonApply.classList.add('white_button-dark');
  showPopup(vacancyFormPopup);
});

function showPopup(popup) {
  popup.classList.remove('hidden');
  overlay.classList.remove('hidden');
  overlay.classList.remove('invisible');
  setTimeout(() => {
    popup.classList.remove('invisible');
  }, 0);
}

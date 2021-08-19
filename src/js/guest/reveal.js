// Section Revealing

const sections = document.querySelectorAll('main section');

function revealSection(entries, observer) {
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

//Lazy Loading
const mainCup = document.querySelector('.intro_cup');
const introSection = document.querySelector('section.intro');

//Костыль для сборщика! Посмотреть адрес картинки на сервере
const src =
  'https://github.com/An-nett/picom/raw/adaptive/src/images/main-cup.png';
const src1 = './images/main-cup.png';
mainCup.src = src;

mainCup.addEventListener('load', function () {
  mainCup.classList.remove('lazy');
  mainCupObserver.observe(introSection);
});

const mainCupObserver = new IntersectionObserver(animateCup, {
  root: null,
  threshold: 0.1,
});

function animateCup(entries) {
  const [entry] = entries;
  addClassWhenIntersecting(mainCup, entry, 'animated');
}

// Cup Shaking
const cupToShake = document.querySelector('.advantages_cup img');
const advantagesSection = document.querySelector('section.advantages');

function shakeCup(entries) {
  const [entry] = entries;
  addClassWhenIntersecting(cupToShake, entry, 'shake-img');
}

function addClassWhenIntersecting(el, entry, className) {
  if (entry.isIntersecting) {
    el.classList.contains(className) ? '' : el.classList.add(className);
  } else {
    el.classList.contains(className) ? el.classList.remove(className) : '';
  }
}

const cupObserver = new IntersectionObserver(shakeCup, {
  root: null,
  threshold: 0.4,
});

cupObserver.observe(advantagesSection);

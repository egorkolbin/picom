const header = document.querySelector('header');
const nav = header.querySelector('nav');
const firstSection = document.querySelector('section');
const headerHeight = header.getBoundingClientRect().height;

function stickyHeader(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) header.classList.add('sticky');
  else header.classList.remove('sticky');
}

const firstSectionObserver = new IntersectionObserver(stickyHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

firstSectionObserver.observe(firstSection);

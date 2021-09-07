const header = document.querySelector('header');
const firstSection = document.querySelector('section');
const headerHeight = header.getBoundingClientRect().height;

export let isStickyHeader;

function stickyHeader(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    header.classList.add('sticky');
    isStickyHeader = true;
  } else {
    header.classList.remove('sticky');
    isStickyHeader = false;
  }
}

const firstSectionObserver = new IntersectionObserver(stickyHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

firstSectionObserver.observe(firstSection);

// Section Revealing

const sections = document.querySelectorAll("section");

function revealSection(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

const infoItemRight = document.querySelector(".opening__info-right");
const infoItemLeft = document.querySelector(".opening__info-left");

infoItemRight.classList.add("moved");
infoItemLeft.classList.add("moved");

const infoObserver = new IntersectionObserver(move, {
  root: null,
  threshold: 0.15,
  rootMargin: "-150px",
});

function move(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("moved");
  observer.unobserve(entry.target);
}

infoObserver.observe(infoItemRight);
infoObserver.observe(infoItemLeft);

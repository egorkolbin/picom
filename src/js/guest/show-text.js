const aboutSection = document.querySelector('section.about');

aboutSection.addEventListener('click', function (evt) {
  if (!evt.target.classList.contains('about_text-more')) return;
  const allParagraphs = Array.from(
    evt.target.closest('.about_description').children
  );
  evt.target.style.display = 'none';
  allParagraphs.forEach((el) => {
    if (el.classList.contains('text-hidden'))
      el.classList.remove('text-hidden');
  });
});

import $ from 'jquery';

import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

$('.about-slides').slick({ accessibility: true, arrows: false });

$('.menu-slides').slick({
  accessibility: true,
  arrows: false,
  adaptiveHeight: true,
});

$('.about_menu-item').on('click', function (e) {
  changeWhenClicking(e, '.about_menu-item', '.about-slides');
});

$('.about-slides').on('afterChange', function (e) {
  changeWhenSwiping(e, '.about_menu-item');
});

$('.content-menu_item').on('click', function (e) {
  changeWhenClicking(e, '.content-menu_item', '.menu-slides');
});

$('.menu-slides').on('afterChange', function (e) {
  changeWhenSwiping(e, '.content-menu_item');
});

function changeWhenClicking(evt, linksList, slidesName) {
  const $slideNum = $(evt.target).data('nav');
  const $prevActive = $(`${linksList}.active`);
  $prevActive.removeClass('active');
  const $newActive = $(`${linksList}[data-nav="${$slideNum}"]`);
  $newActive.addClass('active');
  $(slidesName).slick('slickGoTo', $slideNum);
}

function changeWhenSwiping(evt, linksList) {
  const $slideNum = $(evt.target).slick('slickCurrentSlide');
  $(linksList).removeClass('active');
  const $newActive = $(`${linksList}[data-nav="${$slideNum}"]`);
  $newActive.addClass('active');
}

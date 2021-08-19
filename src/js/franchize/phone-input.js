import Inputmask from "inputmask";

const telApply = document.querySelector('.apply-form input[type="tel"]');
const telApplyPopup = document.querySelector(
  '.apply-popup-form input[type="tel"]'
);

Inputmask({ mask: "+7 (999) 999-9999" }).mask(telApply);
Inputmask({ mask: "+7 (999) 999-9999" }).mask(telApplyPopup);

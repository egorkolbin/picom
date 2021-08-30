import Inputmask from 'inputmask';

const telAdd = document.querySelector('.add-form input[type="tel"]');
const telApply = document.querySelector('.vacancy-form input[type="tel"]');

Inputmask({ mask: '+7 (999) 999-9999' }).mask(telAdd);
Inputmask({ mask: '+7 (999) 999-9999' }).mask(telApply);

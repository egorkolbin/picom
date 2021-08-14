ymaps.ready(init);
function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.753994, 37.62209],
    zoom: 17,
  });
  const petrova = new ymaps.Placemark([55.753994, 37.62209]);
  const berRosha = new ymaps.Placemark([56.8476752, 53.2739979]);
  const center = new ymaps.Placemark([56.8527389, 53.2072039]);
  const lenina = new ymaps.Placemark([56.8451609, 53.2888013]);
  const kirova = new ymaps.Placemark([56.8611039, 53.1747429]);
}

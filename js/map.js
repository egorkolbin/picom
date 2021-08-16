const stores = [
  {
    address: 'ул. Михаила Петрова, 29',
    time: ' с 9:00 до 23:00',
    coords: '56.870831, 53.2900639',
  },
  {
    address: 'Березовая роща',
    time: ' с 9:00 до 23:00',
    coords: '56.8585089, 53.2284074',
  },
  {
    address: 'Центральная площадь, павильон 4',
    time: ' с 9:00 до 23:00',
    coords: '56.8530084, 53.2090089',
  },
  {
    address: 'ул. Ленина, 140',
    time: ' с 9:00 до 23:00',
    coords: '56.8451609, 53.2888013',
  },
  {
    address: 'ул. Кирова, 8д',
    time: ' с 9:00 до 23:00',
    coords: '56.8611039, 53.1747429',
  },
];

const zoom = 13;

const mapStyle = `[
  {
  "featureType" : "string",
  "stylers" : {
    "hue" : "0.5",
    "saturation" : "double",
    "lightness" : "double"
    }
  }
]`;

try {
  ymaps.ready(init);
} catch (err) {
  console.log("Couldn't load map");
  window.addEventListener('load', init);
}

function createMark(coords) {
  return new ymaps.Placemark(
    coords,
    {},
    {
      iconLayout: 'default#image',
      iconImageHref:
        'https://github.com/An-nett/picom/raw/adaptive/images/svg/cart-mark.png',
      //Костыль! Заменить на реальный абсолютный адрес

      iconImageSize: [26, 37],
    }
  );
}

let myMap, mapList;
let addressList;

function init() {
  mapList = document.querySelector('.map_list');
  try {
    myMap = new ymaps.Map('map', {
      center: stores[1].coords.split(','),
      zoom: zoom,
    });
  } catch (err) {}
  clearStoresList();
  for (const store of stores) {
    createStore(store);
  }

  mapList.addEventListener('click', function (evt) {
    const mapListItem = evt.target.closest('li');
    if (!mapListItem) return;

    const storeName = mapListItem.querySelector('.place').textContent;
    const storeEl = stores.find((store) => {
      if (store.address === storeName) return store;
    });
    if (myMap)
      myMap.setCenter(storeEl.coords.split(','), zoom, { duration: 700 });
  });
}

function createStore(store) {
  const storeItem = `<li class="map_list-item">
  <p class="place">${store.address}</p>
  <p class="place_time">Ежедневно <span class="number">${store.time}</span></p>
</li>`;
  mapList.insertAdjacentHTML('beforeend', storeItem);
  addressList = mapList.querySelectorAll('.place');
  try {
    const newMark = createMark(store.coords.split(','));

    newMark.events.add('mouseenter', function () {
      const coords = newMark.geometry.getCoordinates();
      const activeLi = findLiEl(coords);
      addActiveClass(activeLi);
    });
    newMark.events.add('mouseleave', function () {
      const coords = newMark.geometry.getCoordinates();
      const activeLi = findLiEl(coords);
      removeActiveClass(activeLi);
    });

    myMap.geoObjects.add(newMark);
  } catch (err) {}
}

function removeActiveClass(el) {
  el.closest('li').classList.contains('active')
    ? el.closest('li').classList.remove('active')
    : '';
}
function addActiveClass(el) {
  el.closest('li').classList.add('active');
}
function findLiEl(coords) {
  const activeStoreEl = stores.filter(
    (store) => store.coords === coords.join(',')
  );
  const [activeAddress] = Array.from(addressList).filter(
    (text) => text.textContent === activeStoreEl[0].address
  );
  return activeAddress;
}

function clearStoresList() {
  addressList = mapList.querySelectorAll('.place');
  addressList.innerHTML = '';
}

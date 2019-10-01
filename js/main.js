'use strict';

var map = document.querySelector('.map__pins');
var mapWidth = map.clientWidth;

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomFromArr = function (arr, count) {
  if (count === -1) {
    return arr[Math.floor(Math.random() * arr.length)];
  } else {
    var clone = arr;
    var result = [];
    for (var i = 0; i < count || i < arr.length; i++) {
      var index = Math.floor(Math.random());
      result.push(clone[index * clone.length]);
      clone.splice(index, 1);
    }
    return result;
  }
};

var generateAd = function () {
  var ads = [];
  var ADS_NUMBER = 8;
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  for (var i = 0; i < ADS_NUMBER; i++) {
    var locationX = Math.floor(Math.random() * (mapWidth - PIN_WIDTH));
    var locationY = 130 + Math.floor(Math.random() * 500);
    var featuresNumber = 1 + Math.floor(Math.random() * (OFFER_FEATURES.length - 1));
    var ROOMS_MAX = 5;
    var roomNumber = 1 + Math.floor(Math.random() * (ROOMS_MAX - 1));
    var guestNumber = 1 + Math.floor(Math.random() * (roomNumber - 1));
    var PRICE_MAX = 5000;
    var PRICE_MULTIPLIER = 100;
    var price1 = (1 + Math.floor(Math.random() * (PRICE_MAX / PRICE_MULTIPLIER - 1))) * PRICE_MULTIPLIER;
    var price2 = (1 + Math.floor(Math.random() * (PRICE_MAX / PRICE_MULTIPLIER - 1))) * PRICE_MULTIPLIER;
    var priceArr = [price1, price2];
    var photoNumber = i < 10 ? '0' + (i + 1) : (i + 1);
    var photoLink = 'img/avatars/user' + photoNumber + '.png';
    ads.push({
      author: {
        avatar: photoLink
      },
      offer: {
        title: 'title-' + i,
        address: '(' + locationX + ', ' + locationY + ')',
        price: priceArr,
        type: getRandomFromArr(OFFER_TYPES, -1),
        rooms: roomNumber,
        guests: guestNumber,
        checkin: getRandomFromArr(CHECK_TIMES, -1),
        checkout: getRandomFromArr(CHECK_TIMES, -1),
        features: getRandomFromArr(OFFER_FEATURES, featuresNumber),
        description: '{{descr-' + i + '}}',
        photos: OFFER_PHOTOS
      },
      location: {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return ads;
};

var ads = generateAd();

document.querySelector('.map').classList.remove('map--faded');

var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  return pinElement;
};
var renderMap = function (pin, mapWindow) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pin.length; i++) {
    fragment.appendChild(renderPin(pin[i]));
  }
  mapWindow.appendChild(fragment);
};

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

var offerType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'palace':
      return 'Дворец';
    default:
      return 'Дом';
  }
};

var renderCardPhoto = function (cardElement, ad) {
  var photoBlock = cardElement.querySelector('.popup__photos');
  var photoImg = photoBlock.querySelector('.popup__photo').cloneNode(true);
  photoBlock.innerHTML = '';
  for (var i = 0; i < ad.offer.photos.length; i++) {
    var photo = photoImg.cloneNode(true);
    photo.src = ad.offer.photos[i];
    photoBlock.appendChild(photo);
  }
};

var renderCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = Math.min.apply(null, ad.offer.price) + '₽/ночь';
  cardElement.querySelector('.popup__type').alt = offerType(ad.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = ad.offer.features.join(', ');
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  renderCardPhoto(cardElement, ad);
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  var fragment = document.createDocumentFragment();
  fragment.appendChild(cardElement);
  map.appendChild(fragment);
};

renderMap(ads, map);
renderCard(ads[0]);

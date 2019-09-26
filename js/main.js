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
    var photosNumber = 1 + Math.floor(Math.random() * (OFFER_PHOTOS.length - 1));
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'title-' + i,
        'address': '{{location.x-' + i + '}}, {{location.y-' + i + '}}',
        'price': '{{price1-' + i + '}}, {{price2-' + i + '}}',
        'type': getRandomFromArr(OFFER_TYPES, -1),
        'rooms': '{{rooms-' + i + '}}',
        'guests': '{{guests-' + i + '}}',
        'checkin': getRandomFromArr(CHECK_TIMES, -1),
        'checkout': getRandomFromArr(CHECK_TIMES, -1),
        'features': getRandomFromArr(OFFER_FEATURES, featuresNumber),
        'description': '{{descr-' + i + '}}',
        'photos': getRandomFromArr(OFFER_PHOTOS, photosNumber)
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    ads.push(ad);
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

renderMap(ads, map);

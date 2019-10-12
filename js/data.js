'use strict';
(function () {
  var mapWidth = window.map.clientWidth;

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
      var locationX = Math.floor(Math.random() * (mapWidth - window.PIN_WIDTH));
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
          type: window.util.getRandomFromArr(OFFER_TYPES, -1),
          rooms: roomNumber,
          guests: guestNumber,
          checkin: window.util.getRandomFromArr(CHECK_TIMES, -1),
          checkout: window.util.getRandomFromArr(CHECK_TIMES, -1),
          features: window.util.getRandomFromArr(OFFER_FEATURES, featuresNumber),
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

  window.ads = generateAd();
})();

'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - window.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - window.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    return pinElement;
  };

  var addingPinHandler = function (mapPins, index) {
    var pinHandler = function (evt) {
      if (evt.type === 'mousedown' || evt.code === 'Enter' || evt.code === 'NumpadEnter') {
        var popup = window.map.map.querySelector('.popup');
        if (!popup) {
          window.card.renderCard(window.adsInMap[index]);
        } else {
          if (getComputedStyle(popup).display === 'none') {
            popup.style.display = 'block';
          }
          window.card.setCard(popup, window.adsInMap[index]);
        }

        window.map.map.querySelector('.popup__close').addEventListener('mousedown', window.card.hideCard);
        window.map.map.querySelector('.popup__close').addEventListener('keydown', window.card.hideCard);
      }
    };
    mapPins[index].addEventListener('mousedown', pinHandler);
    mapPins[index].addEventListener('keydown', pinHandler);
  };

  window.pin = {
    renderPin: renderPin,
    addingPinHandler: addingPinHandler,
  };
})();

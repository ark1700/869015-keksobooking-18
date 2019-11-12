'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    return pinElement;
  };

  var addPinHandlers = function (mapPins, index) {
    var pinShowCardHandler = function (evt) {
      if (evt.type === 'mousedown' || evt.code === 'Enter' || evt.code === 'NumpadEnter') {
        var popup = window.map.map.querySelector('.popup');
        if (!popup) {
          window.card.renderCard(window.data.adsInMap[index]);
        } else {
          if (getComputedStyle(popup).display === 'none') {
            popup.style.display = 'block';
          }
          window.card.setCard(popup, window.data.adsInMap[index]);
        }

        window.map.map.querySelector('.popup__close').addEventListener('mousedown', window.card.closeCardBtnHideCardHandler);
        window.map.map.querySelector('.popup__close').addEventListener('keydown', window.card.closeCardBtnHideCardHandler);
        window.addEventListener('keydown', window.card.escKeyHideCardHandler);
      }
    };
    mapPins[index].addEventListener('mousedown', pinShowCardHandler);
    mapPins[index].addEventListener('keydown', pinShowCardHandler);
  };

  window.pin = {
    renderPin: renderPin,
    addPinHandlers: addPinHandlers,
  };
})();

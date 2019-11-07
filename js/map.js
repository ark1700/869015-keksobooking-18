'use strict';

(function () {
  var MAIN_PIN_TOP = '375px';
  var map = document.querySelector('.map__pins');

  var renderMap = function (pins, mapWindow) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.renderPin(pins[i]));
    }
    mapWindow.appendChild(fragment);
  };

  var mainPin = document.querySelector('.map__pin--main');

  var activateMapHandler = function (evt) {
    if ((evt.type === 'mousedown' || evt.code === 'Enter' || evt.code === 'NumpadEnter') && window.data.ads) {
      mainPin.removeEventListener('mousedown', activateMapHandler);
      mainPin.removeEventListener('keydown', activateMapHandler);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.form.disableAllInputs(false);
      renderMap(window.data.adsInMap, map);
      window.filter.filterPins();
      window.mainPin.setInputLocation();
      window.form.validateForm();

      var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < mapPins.length; i++) {
        window.pin.addPinHandler(mapPins, i);
      }
    }
  };

  var deactivateMapHandler = function () {
    mainPin.addEventListener('mousedown', activateMapHandler);
    mainPin.addEventListener('keydown', activateMapHandler);
    document.querySelector('.ad-form').reset();
    document.querySelector('.map__filters').reset();
    window.form.disableAllInputs();

    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins) {
      pins.forEach(function (pin) {
        pin.remove();
      });
    }

    if (map.querySelector('.popup')) {
      map.querySelector('.popup').remove();
    }

    mainPin.style.top = MAIN_PIN_TOP;
    mainPin.style.left = parseInt(getComputedStyle(map).width.slice(0, -2), 10) / 2 - parseInt(getComputedStyle(mainPin).width.slice(0, -2), 10) / 2 + 'px';
    window.mainPin.setInputLocation();

    if (window.form.successFormMessage) {
      document.removeEventListener('mousedown', window.form.successFormMessageHandler);
      document.removeEventListener('keydown', window.form.successFormMessageHandler);
    }
  };

  var refresh = function () {
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (el) {
      el.remove();
    });
    renderMap(window.data.adsInMap, map);
    mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      window.pin.addPinHandler(mapPins, i);
    }

    var popup = window.map.map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  deactivateMapHandler();

  window.map = {
    map: map,
    deactivateMapHandler: deactivateMapHandler,
    refresh: refresh,
    renderMap: renderMap,
  };
})();

'use strict';

(function () {
  var map = document.querySelector('.map__pins');

  var renderMap = function (pin, mapWindow) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pin.length; i++) {
      fragment.appendChild(window.pin.renderPin(pin[i]));
    }
    mapWindow.appendChild(fragment);
  };

  var mainPin = document.querySelector('.map__pin--main');

  var activateMap = function (evt) {
    if ((evt.type === 'mousedown' || evt.code === 'Enter' || evt.code === 'NumpadEnter') && window.ads) {
      mainPin.removeEventListener('mousedown', activateMap);
      mainPin.removeEventListener('keydown', activateMap);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.form.disableAllInputs(false);
      renderMap(window.adsInMap, map);
      window.filter.filterPins();
      window.mainPin.setInputLocation();
      window.form.validtionForm();

      var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < mapPins.length; i++) {
        window.pin.addingPinHandler(mapPins, i);
      }
    }
  };

  var deactivateMap = function () {
    mainPin.addEventListener('mousedown', activateMap);
    mainPin.addEventListener('keydown', activateMap);
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

    mainPin.style.top = '375px';
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
    renderMap(window.adsInMap, map);
    mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      window.pin.addingPinHandler(mapPins, i);
    }

    var popup = window.map.map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  deactivateMap();

  window.map = {
    map: map,
    deactivateMap: deactivateMap,
    refresh: refresh,
    renderMap: renderMap,
  };
})();

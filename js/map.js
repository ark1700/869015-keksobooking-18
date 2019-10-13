'use strict';

(function () {
  var renderMap = function (pin, mapWindow) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pin.length; i++) {
      fragment.appendChild(window.pin.renderPin(pin[i]));
    }
    mapWindow.appendChild(fragment);
  };

  var mainPin = document.querySelector('.map__pin--main');

  var activateMap = function (evt) {
    if ((evt.type === 'mousedown' || evt.code === 'Enter') && window.ads) {
      mainPin.removeEventListener('mousedown', activateMap);
      mainPin.removeEventListener('keydown', activateMap);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.form.disableAllInputs(false);
      renderMap(window.ads, window.map);
      window.mainPin.setInputLocation();
      window.form.validtionForm();

      var mapPins = window.map.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < mapPins.length; i++) {
        window.pin.addingPinHandler(mapPins, i);
      }
    }
  };

  mainPin.addEventListener('mousedown', activateMap);
  mainPin.addEventListener('keydown', activateMap);

  window.form.disableAllInputs();
})();

'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;
  var Y_MIN_COORDS = 130;
  var Y_MAX_COORDS = 630;
  var Y_MIN = Y_MIN_COORDS - MAIN_PIN_HEIGHT;
  var Y_MAX = Y_MAX_COORDS - MAIN_PIN_HEIGHT;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var X_MAX = map.offsetWidth - mainPin.offsetWidth / 2;
  var X_MIN = -mainPin.offsetWidth / 2;
  var locationInput = document.querySelector('#address');

  var setInputLocation = function () {
    var mainPinStyle = getComputedStyle(mainPin);
    var coordinateX = Math.round(Number(mainPinStyle.left.slice(0, -2)) + MAIN_PIN_WIDTH / 2);
    var coordinateY = Math.round(Number(mainPinStyle.top.slice(0, -2)) + MAIN_PIN_HEIGHT);
    locationInput.value = coordinateX + ', ' + coordinateY;
  };

  // drag dialog

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var shiftX = evt.clientX - mainPin.getBoundingClientRect().left;
    var shiftY = evt.clientY - mainPin.getBoundingClientRect().top;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var newLeft = moveEvt.clientX - shiftX - map.getBoundingClientRect().left;
      var newTop = moveEvt.clientY - shiftY - map.getBoundingClientRect().top;

      if (newLeft < X_MIN) {
        newLeft = X_MIN;
      }
      if (newLeft > X_MAX) {
        newLeft = X_MAX;
      }
      if (newTop < Y_MIN) {
        newTop = Y_MIN;
      }
      if (newTop > Y_MAX) {
        newTop = Y_MAX;
      }

      mainPin.style.left = newLeft + 'px';
      mainPin.style.top = newTop + 'px';
      setInputLocation();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var mainPinHandler = function (dragEvt) {
          dragEvt.preventDefault();
          mainPin.removeEventListener('click', mainPinHandler);
        };
        mainPin.addEventListener('click', mainPinHandler);
      }

    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.mainPin = {
    setInputLocation: setInputLocation,
  };
})();

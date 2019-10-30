'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;

  var locationInput = document.querySelector('#address');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var X_MAX = map.offsetWidth - mainPin.offsetWidth / 2;
  var X_MIN = -mainPin.offsetWidth / 2;
  var Y_MIN_COORDS = 130;
  var Y_MAX_COORDS = 630;
  var Y_MIN = Y_MIN_COORDS - MAIN_PIN_HEIGHT;
  var Y_MAX = Y_MAX_COORDS - MAIN_PIN_HEIGHT;

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

    var shiftX = event.clientX - mainPin.getBoundingClientRect().left;
    var shiftY = event.clientY - mainPin.getBoundingClientRect().top;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var newLeft = event.clientX - shiftX - map.getBoundingClientRect().left;
      var newTop = event.clientY - shiftY - map.getBoundingClientRect().top;

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

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin = {
    setInputLocation: setInputLocation,
  };
})();

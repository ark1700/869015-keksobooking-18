'use strict';
(function () {

  var locationInput = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;

  var setInputLocation = function () {
    var mainPinStyle = getComputedStyle(mainPin);
    var coordinateX = Math.round(Number(mainPinStyle.left.slice(0, -2)) + MAIN_PIN_WIDTH / 2);
    var coordinateY = Math.round(Number(mainPinStyle.top.slice(0, -2)) + MAIN_PIN_HEIGHT);
    locationInput.value = coordinateX + ', ' + coordinateY;
  };

  // drag dialog

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var Y_MIN = 129;
      var Y_MAX = 631;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (
        mainPin.offsetLeft - shift.x > -MAIN_PIN_WIDTH / 2 && // x min
        mainPin.offsetLeft - shift.x < window.map.clientWidth - MAIN_PIN_WIDTH / 2 && // x max
        mainPin.offsetTop - shift.y > Y_MIN - MAIN_PIN_HEIGHT && // y min
        mainPin.offsetTop - shift.y < Y_MAX - MAIN_PIN_HEIGHT // y max
      ) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        setInputLocation();
      }
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

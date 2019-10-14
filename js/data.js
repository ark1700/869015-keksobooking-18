'use strict';
(function () {
  var makeData = function (data) {
    window.ads = data;
  };

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;
    var errorBtn = error.querySelector('.error__button');

    var errorBtnHandler = function (evt) {
      evt.preventDefault();
      if (evt.code === 'Enter' || evt.code === 'NumpadEnter' || evt.type === 'mousedown') {
        window.location.reload();
      }
    };

    errorBtn.addEventListener('mousedown', errorBtnHandler);
    errorBtn.addEventListener('keydown', errorBtnHandler);
    document.body.insertAdjacentElement('afterbegin', error);
  };

  window.loadAds(makeData, errorHandler);
})();

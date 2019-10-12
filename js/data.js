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
    errorBtn.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.location.reload();
    });
    errorBtn.addEventListener('keydown', function (evt) {
      evt.preventDefault();
      if (evt.code === 'Enter') {
        window.location.reload();
      }
    });
    document.body.insertAdjacentElement('afterbegin', error);
  };

  window.loadAds(makeData, errorHandler);
})();

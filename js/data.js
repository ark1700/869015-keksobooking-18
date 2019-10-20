'use strict';
(function () {
  var ADS_NUMBER = 5;
  var makeData = function (data) {
    window.ads = data;
    window.adsInMap = window.ads.slice();
    if (window.adsInMap.length > ADS_NUMBER) {
      window.adsInMap.length = ADS_NUMBER;
    }
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

  window.data = {
    ADS_NUMBER: ADS_NUMBER,
  };
})();

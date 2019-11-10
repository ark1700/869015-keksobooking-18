'use strict';
(function () {
  var ADS_NUMBER = 5;
  var makeData = function (data) {
    var ads = data;
    var adsInMap = ads.slice();
    if (adsInMap.length > ADS_NUMBER) {
      adsInMap.length = ADS_NUMBER;
    }
    window.data = {
      ads: ads,
      adsInMap: adsInMap,
      ADS_NUMBER: ADS_NUMBER,
    };
  };

  var reportAnError = function (errorMessage) {
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

  window.backend.loadAds(makeData, reportAnError);
})();

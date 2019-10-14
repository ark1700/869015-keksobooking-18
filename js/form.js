'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var validtionForm = function () {
    var guestsNumberInput = adForm.querySelector('#capacity');
    var roomsNumberInput = adForm.querySelector('#room_number');

    adForm.addEventListener('input', function () {
      if (guestsNumberInput.value > roomsNumberInput.value) {
        guestsNumberInput.setCustomValidity('Кол-во гостей не должно превышать кол-ва комнат');
      } else {
        guestsNumberInput.setCustomValidity('');
      }
    });

    var adTitle = adForm.querySelector('input[name="title"]');
    var adPrice = adForm.querySelector('input[name="price"]');
    var adType = adForm.querySelector('select[name="type"]');
    var adTimeIn = adForm.querySelector('select[name="timein"]');
    var adTimeOut = adForm.querySelector('select[name="timeout"]');
    var minTypePrice = [
      ['bungalo', 'flat', 'house', 'palace'],
      [0, 1000, 5000, 10000]
    ];

    var getMinTypePrice = function (type) {
      var result;
      for (var i = 0; i < minTypePrice[0].length; i++) {
        if (type === minTypePrice[0][i]) {
          result = minTypePrice[1][i];
        }
      }
      return result;
    };

    adTitle.addEventListener('invalid', function () {
      switch (true) {
        case adTitle.validity.tooShort:
          adTitle.setCustomValidity('Заголовок объявления должeн состоять минимум из 30 символов');
          break;
        case adTitle.validity.tooLong:
          adTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
          break;
        case adTitle.validity.valueMissing:
          adTitle.setCustomValidity('Обязательное поле');
          break;
        default:
          adTitle.setCustomValidity('');
      }
    });

    adPrice.addEventListener('invalid', function () {
      switch (true) {
        case adTitle.validity.tooLong:
          adTitle.setCustomValidity('Цена не должна превышать 1 000 0000 руб.');
          break;
        case adTitle.validity.valueMissing:
          adTitle.setCustomValidity('Обязательное поле');
          break;
        default:
          adTitle.setCustomValidity('');
      }
    });

    adPrice.addEventListener('input', function (evt) {
      var target = evt.target;
      adType = adForm.querySelector('select[name="type"]');
      if (target.value < getMinTypePrice(adType.value)) {
        target.setCustomValidity('Минимальная "Цена за ночь" для ' + adType.options[adType.selectedIndex].innerHTML + ' - ' + getMinTypePrice(adType.value) + ' руб.');
        return;
      }
      target.setCustomValidity('');
    });

    adType.addEventListener('input', function () {
      adPrice.min = getMinTypePrice(adType.value);
      adPrice.placeholder = getMinTypePrice(adType.value);
    });

    adTimeIn.addEventListener('input', function () {
      adTimeOut.value = adTimeIn.value;
    });

    adTimeOut.addEventListener('input', function () {
      adTimeIn.value = adTimeOut.value;
    });
  };

  var adFieldsets = document.querySelectorAll('fieldset, select');

  var disableAllInputs = function (disabled) {
    if (disabled === undefined) {
      disabled = true;
    }
    adFieldsets.forEach(function (elem) {
      elem.disabled = disabled;
    });
  };

  var onSuccessForm = function () {
    window.map.deactivateMap();

    var successFormTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successFormMessage = successFormTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', successFormMessage);

    var successFormMessageHandler = function (evt) {
      if (evt.type === 'mousedown' || evt.code === 'Escape') {
        successFormMessage.remove();
      }
    };
    document.addEventListener('mousedown', successFormMessageHandler);
    document.addEventListener('keydown', successFormMessageHandler);

    window.form.successFormMessage = successFormMessage;
    window.form.successFormMessageHandler = successFormMessageHandler;
  };

  var onErrorForm = function (msg) {
    var errorFormTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorFormMessage = errorFormTemplate.cloneNode(true);
    errorFormMessage.querySelector('.error__message').textContent = msg;
    document.body.insertAdjacentElement('afterbegin', errorFormMessage);

    var errorBtn = document.querySelector('.error__button');

    var errorHandler = function (evt) {
      if (evt.type === 'mousedown' || evt.code === 'Escape' ||
        evt.target === errorBtn && (evt.code === 'Enter' || evt.code === 'NumpadEnter')
      ) {
        errorFormMessage.remove();

        document.removeEventListener('mousedown', errorHandler);
        document.removeEventListener('keydown', errorHandler);
        errorBtn.addEventListener('keydown', errorHandler);
      }
    };

    document.addEventListener('mousedown', errorHandler);
    document.addEventListener('keydown', errorHandler);
    errorBtn.addEventListener('keydown', errorHandler);
  };


  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), onSuccessForm, onErrorForm);
  });

  window.form = {
    validtionForm: validtionForm,
    disableAllInputs: disableAllInputs,
  };
})();

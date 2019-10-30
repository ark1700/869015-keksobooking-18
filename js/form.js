'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var validtionForm = function () {
    var adRoomsNumber = adForm.querySelector('#room_number');
    var adGuestsNumber = adForm.querySelector('#capacity');
    var adGuestsNumberOptions = adForm.querySelectorAll('#capacity option');

    adRoomsNumber.addEventListener('change', function () {
      var validity = true;
      adGuestsNumberOptions.forEach(function (adGuestsNumberOption) {
        if (parseInt(adGuestsNumberOption.value, 10) > parseInt(adRoomsNumber.value, 10)) {
          adGuestsNumberOption.disabled = true;
          validity = false;
        } else {
          adGuestsNumberOption.disabled = false;
        }
        if (!validity) {
          adGuestsNumber.setCustomValidity('Кол-во гостей не должно превышать кол-во комнат');
        } else {
          adGuestsNumber.setCustomValidity('');
        }
      });
    });

    var adTitle = adForm.querySelector('input[name="title"]');
    var adPrice = adForm.querySelector('input[name="price"]');
    var adType = adForm.querySelector('select[name="type"]');
    var adTimeIn = adForm.querySelector('select[name="timein"]');
    var adTimeOut = adForm.querySelector('select[name="timeout"]');

    var MinTypePrice = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000,
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

    var priceValidationHandler = function () {
      adType = adForm.querySelector('select[name="type"]');
      switch (true) {
        case adPrice.validity.valueMissing:
          adPrice.setCustomValidity('Обязательное поле');
          break;
        case adPrice.value < MinTypePrice[adType.value]:
          adPrice.setCustomValidity('Минимальная "Цена за ночь" для ' + adType.options[adType.selectedIndex].innerHTML + ' - ' + MinTypePrice[adType.value] + ' руб.');
          break;
        case adPrice.validity.tooLong:
          adPrice.setCustomValidity('Цена не должна превышать 1 000 0000 руб.');
          break;
        default:
          adPrice.setCustomValidity('');
      }
    };

    adPrice.addEventListener('change', priceValidationHandler);

    adType.addEventListener('change', function () {
      adPrice.min = MinTypePrice[adType.value];
      adPrice.placeholder = MinTypePrice[adType.value];
      priceValidationHandler();
    });

    adTimeIn.addEventListener('change', function () {
      adTimeOut.value = adTimeIn.value;
    });

    adTimeOut.addEventListener('change', function () {
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

  var restFormBtn = adForm.querySelector('.ad-form__reset');

  var resetForm = function (evt) {
    evt.preventDefault();
    if (evt.type === 'click' || evt.code === 'Enter' || evt.code === 'NumpadEnter') {
      adForm.reset();
      window.mainPin.setInputLocation();
    }
  };

  restFormBtn.addEventListener('click', resetForm);
  restFormBtn.addEventListener('keydown', resetForm);

  window.form = {
    validtionForm: validtionForm,
    disableAllInputs: disableAllInputs,
  };
})();

'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.popup');

  var findOfferType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'palace':
        return 'Дворец';
      default:
        return 'Дом';
    }
  };

  var toogleDisplay = function (doAction, value, hidenElement) {
    if (value.toString().trim()) {
      doAction();
      hidenElement.style.display = 'block';
    } else if (hidenElement) {
      hidenElement.innerHTML = '';
      hidenElement.style.display = 'none';
    }
  };

  var renderCardPhoto = function (card, ad) {
    var action = function () {
      var photoBlock = card.querySelector('.popup__photos');
      photoBlock.innerHTML = '';
      var photoImg = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < ad.offer.photos.length; i++) {
        var photo = photoImg.cloneNode(true);
        photo.src = ad.offer.photos[i];
        fragment.appendChild(photo);
      }
      photoBlock.appendChild(fragment);
    };
    toogleDisplay(action, ad.offer.photos, card.querySelector('.popup__photos'));
  };

  var featuresList = {
    'wifi': '.popup__feature--wifi',
    'dishwasher': '.popup__feature--dishwasher',
    'parking': '.popup__feature--parking',
    'washer': '.popup__feature--washer',
    'elevator': '.popup__feature--elevator',
    'conditioner': '.popup__feature--conditioner',
  };

  var setFeatureCardElement = function (cardElement, offerFeatures) {
    var features = cardElement.querySelector('.popup__features');
    features.innerHTML = '';
    offerFeatures.forEach(function (offerFeature) {
      features.appendChild(cardTemplate.querySelector(featuresList[offerFeature]).cloneNode(true));
    });
  };

  var setCardElement = function (card, selector, attribute, value) {
    var action = function () {
      card.querySelector(selector)[attribute] = value;
    };
    toogleDisplay(action, value, card.querySelector(selector));
  };

  var setCard = function (cardElement, ad) {
    setCardElement(cardElement, '.popup__title', 'textContent', ad.offer.title);
    setCardElement(cardElement, '.popup__text--address', 'textContent', ad.offer.address);
    setCardElement(cardElement, '.popup__text--price', 'textContent', ad.offer.price + '₽/ночь');
    setCardElement(cardElement, '.popup__type', 'textContent', findOfferType(ad.offer.type));
    setCardElement(cardElement, '.popup__text--capacity', 'textContent', ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей');
    setCardElement(cardElement, '.popup__text--time', 'textContent', 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout);
    setFeatureCardElement(cardElement, ad.offer.features);
    setCardElement(cardElement, '.popup__description', 'textContent', ad.offer.description);
    renderCardPhoto(cardElement, ad);
    setCardElement(cardElement, '.popup__avatar', 'src', ad.author.avatar);
  };

  var renderCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);
    setCard(cardElement, ad);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(cardElement);
    window.map.map.appendChild(fragment);
  };

  var closeCardBtnHideCardHandler = function (evt) {
    if (evt.type === 'mousedown' || evt.code === 'Enter' || evt.code === 'NumpadEnter') {
      window.map.map.querySelector('.popup').style.display = 'none';
      window.map.map.querySelector('.popup__close').removeEventListener('mousedown', closeCardBtnHideCardHandler);
    }
  };

  var escKeyHideCardHandler = function (evt) {
    if (evt.code === 'Escape') {
      window.map.map.querySelector('.popup').style.display = 'none';
      window.removeEventListener('keydown', escKeyHideCardHandler);
    }
  };

  window.card = {
    renderCard: renderCard,
    setCard: setCard,
    closeCardBtnHideCardHandler: closeCardBtnHideCardHandler,
    escKeyHideCardHandler: escKeyHideCardHandler,
  };
})();

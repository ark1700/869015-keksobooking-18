'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.popup');

  var offerType = function (type) {
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

  var hideIfEmptyElem = function (doSmth, value, hidedElem) {
    if (value.toString()) {
      doSmth();
      if (hidedElem.style.display === 'none') {
        hidedElem.style.display = 'block';
      }
    } else if (hidedElem) {
      hidedElem.innerHTML = '';
      hidedElem.style.display = 'none';
    }
  };

  var renderCardPhoto = function (card, ad) {
    var action = function () {
      var photoBlock = card.querySelector('.popup__photos');
      photoBlock.innerHTML = '';
      var photoImg = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      for (var i = 0; i < ad.offer.photos.length; i++) {
        var photo = photoImg.cloneNode(true);
        photo.src = ad.offer.photos[i];
        photoBlock.appendChild(photo);
      }
    };
    hideIfEmptyElem(action, ad.offer.photos, card.querySelector('.popup__photos'));
  };

  var setCardElement = function (card, selector, func, value) {
    var action = function () {
      card.querySelector(selector)[func] = value;
    };
    hideIfEmptyElem(action, value, card.querySelector(selector));
  };

  var setCard = function (cardElement, ad) {
    setCardElement(cardElement, '.popup__title', 'textContent', ad.offer.title);
    setCardElement(cardElement, '.popup__text--address', 'textContent', ad.offer.address);
    setCardElement(cardElement, '.popup__text--price', 'textContent', ad.offer.price + '₽/ночь');
    setCardElement(cardElement, '.popup__type', 'textContent', offerType(ad.offer.type));
    setCardElement(cardElement, '.popup__text--capacity', 'textContent', ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей');
    setCardElement(cardElement, '.popup__text--time', 'textContent', 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout);
    setCardElement(cardElement, '.popup__features', 'textContent', ad.offer.features.join(', '));
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

  var hideCard = function (evt) {
    if (evt.type === 'mousedown' || evt.code === 'Enter' || evt.code === 'NumpadEnter') {
      window.map.map.querySelector('.popup').style.display = 'none';
      window.map.map.querySelector('.popup__close').removeEventListener('mousedown', hideCard);
    }
  };

  var onEscHideCard = function (evt) {
    if (evt.code === 'Escape') {
      window.map.map.querySelector('.popup').style.display = 'none';
      window.removeEventListener('keydown', onEscHideCard);
    }
  };

  window.card = {
    renderCard: renderCard,
    setCard: setCard,
    hideCard: hideCard,
    onEscHideCard: onEscHideCard,
  };
})();

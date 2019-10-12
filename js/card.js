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

  var renderCardPhoto = function (cardElement, ad) {
    var photoBlock = cardElement.querySelector('.popup__photos');
    var photoImg = photoBlock.querySelector('.popup__photo').cloneNode(true);
    photoBlock.innerHTML = '';
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var photo = photoImg.cloneNode(true);
      photo.src = ad.offer.photos[i];
      photoBlock.appendChild(photo);
    }
  };

  var setCard = function (cardElement, ad) {
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').alt = offerType(ad.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = ad.offer.features.join(', ');
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    renderCardPhoto(cardElement, ad);
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  };

  var renderCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);
    setCard(cardElement, ad);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(cardElement);
    window.map.appendChild(fragment);
  };

  var hideCard = function (evt) {
    if (evt.type === 'mousedown' || evt.code === 'Enter') {
      window.map.querySelector('.popup').style.display = 'none';
      window.map.querySelector('.popup__close').removeEventListener('mousedown', hideCard);
    }
  };

  window.card = {
    renderCard: renderCard,
    setCard: setCard,
    hideCard: hideCard,
  };
})();

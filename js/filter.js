'use strict';
(function () {
  var LOW_OFFER_PRICE = 10000;
  var MID_OFFER_PRICE = 50000;
  var mapFilters = document.querySelector('.map__filters');
  var filterInputPrice = mapFilters.querySelector('select#housing-price');
  var filterFeatures = mapFilters.querySelectorAll('input[type="checkbox"][name="features"]');

  var filterByType = function (type, ad) {
    var filterInput = mapFilters.querySelector('select#housing-' + type);
    if (filterInput.value !== 'any') {
      return ad.offer[type].toString() === filterInput.value;
    }
    return true;
  };

  var filterByPrice = function (ad) {
    switch (filterInputPrice.value) {
      case 'low':
        return ad.offer.price < LOW_OFFER_PRICE;
      case 'middle':
        return ad.offer.price > LOW_OFFER_PRICE && ad.offer.price < MID_OFFER_PRICE;
      case 'high':
        return ad.offer.price > MID_OFFER_PRICE;
      default:
        return true;
    }
  };

  var features = [];

  var featuresFilterPin = function (ad) {
    features = [];
    filterFeatures.forEach(function (feature) {
      if (feature.checked) {
        features.push(feature.value);
      }
    });
    for (var i = 0; i < features.length; i++) {
      if (!ad.offer.features.includes(features[i])) {
        return false;
      }
    }

    return true;
  };

  var filterPin = function (ad) {
    return filterByType('type', ad) &&
          filterByPrice(ad) &&
          filterByType('rooms', ad) &&
          filterByType('guests', ad) &&
          featuresFilterPin(ad);
  };

  var filterPins = function () {
    window.data.adsInMap = window.data.ads.slice();
    window.data.adsInMap = window.data.adsInMap.filter(filterPin);
    if (window.data.adsInMap.length > window.data.ADS_NUMBER) {
      window.data.adsInMap.length = window.data.ADS_NUMBER;
    }
    window.map.refresh();
  };

  var debounceFilterPins = window.util.debounce(filterPins);

  var filterInputs = mapFilters.querySelectorAll('select,input[type="checkbox"]');
  filterInputs.forEach(function (input) {
    input.addEventListener('change', debounceFilterPins);
  });

  window.filter = {
    filterPins: filterPins,
  };
})();

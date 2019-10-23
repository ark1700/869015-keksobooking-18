'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var filterInputPrice = mapFilters.querySelector('select#housing-price');
  var filterFeatures = mapFilters.querySelectorAll('input[type="checkbox"][name="features"]');

  var customFilterPin = function (type, ad) {
    var filterInput = mapFilters.querySelector('select#housing-' + type);
    if (filterInput.value !== 'any') {
      return ad.offer[type].toString() === filterInput.value;
    }
    return true;
  };

  var priceFilterPin = function (ad) {
    switch (filterInputPrice.value) {
      case 'low':
        return ad.offer.price < 10000;
      case 'middle':
        return ad.offer.price > 10000 && ad.offer.price < 50000;
      case 'high':
        return ad.offer.price > 10000;
      default:
        return true;
    }
  };

  var features = [];

  var featuresFilterPin = function (ad) {
    var isGood = true;
    features = [];
    filterFeatures.forEach(function (feature) {
      if (feature.checked) {
        features.push(feature.value);
      }
    });
    features.forEach(function (feature) {
      isGood = isGood && ad.offer.features.includes(feature);
    });
    return isGood;
  };

  var conditionForFilter = function (ad) {

    return customFilterPin('type', ad) &&
          priceFilterPin(ad) &&
          customFilterPin('rooms', ad) &&
          customFilterPin('guests', ad) &&
          featuresFilterPin(ad);
  };

  var filterPins = function () {
    window.adsInMap = window.ads.slice();
    window.adsInMap = window.adsInMap.filter(conditionForFilter);
    if (window.adsInMap.length > window.data.ADS_NUMBER) {
      window.adsInMap.length = window.data.ADS_NUMBER;
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

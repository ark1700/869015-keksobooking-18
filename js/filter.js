'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var filterInputPrice = mapFilters.querySelector('select#housing-price');
  var filterFeatures = mapFilters.querySelectorAll('input[type="checkbox"][name="features"]');

  var filterPin = function (type) {
    var filterInput = mapFilters.querySelector('select#housing-' + type);
    if (filterInput.value !== 'any') {
      window.adsInMap = window.adsInMap.filter(function (ad) {
        return ad.offer[type].toString() === filterInput.value;
      });
    }
  };

  var priceFilterPin = function () {
    window.adsInMap = window.adsInMap.filter(function (ad) {
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
    });
  };

  var features = [];

  var featuresFilterPin = function () {
    features = [];
    filterFeatures.forEach(function (feature) {
      if (feature.checked) {
        features.push(feature.value);
      }
    });


    features.forEach(function (feature) {
      var goodAds = [];
      window.adsInMap.forEach(function (ad) {
        if (ad.offer.features.includes(feature)) {
          goodAds.push(ad);
        }
      });
      window.adsInMap = goodAds;
    });

    // console.log(features);

    // features.forEach(function (feature) {
    //   adsInMap.filter(function (ad) {
    //     return (ad.offer.features.includes(feature));
    //   });
    // });

    // console.log(adsInMap.map(ad => ad.offer.features));
  };

  var filterPins = function () {
    window.adsInMap = window.ads;
    filterPin('type');
    priceFilterPin();
    filterPin('rooms');
    filterPin('guests');
    featuresFilterPin();
    if (window.adsInMap.length > window.data.ADS_NUMBER) {
      window.adsInMap.length = window.data.ADS_NUMBER;
    }
    window.map.refresh();
  };

  var debounceFilterPins = window.debounce(filterPins);

  var filterInputs = mapFilters.querySelectorAll('select,input[type="checkbox"]');
  filterInputs.forEach(function (input) {
    input.addEventListener('change', debounceFilterPins);
  });

  window.filter = {
    filterPins: filterPins,
  };
})();

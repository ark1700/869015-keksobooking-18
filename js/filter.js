'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var filterInput = mapFilters.querySelector('select#housing-type');

  var typeFilterPin = function (filterType) {
    window.adsInMap = window.adsInMap.filter(function (ad) {
      return filterInput.value === 'any' || ad.offer[filterType] === filterInput.value;
    });
  };

  var filterPins = function () {
    window.adsInMap = window.ads;
    typeFilterPin('type');
    if (window.adsInMap.length > window.data.ADS_NUMBER) {
      window.adsInMap.length = window.data.ADS_NUMBER;
    }
    window.map.refresh();
  };

  filterInput.addEventListener('change', filterPins);
})();

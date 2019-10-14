'use strict';
(function () {
  var getRandomFromArr = function (arr, count) {
    if (count === -1) {
      return arr[Math.floor(Math.random() * arr.length)];
    } else {
      var clone = arr;
      var result = [];
      for (var i = 0; i < count || i < arr.length; i++) {
        var index = Math.floor(Math.random());
        result.push(clone[index * clone.length]);
        clone.splice(index, 1);
      }
      return result;
    }
  };

  window.PIN_WIDTH = 50;
  window.PIN_HEIGHT = 70;

  window.util = {
    getRandomFromArr: getRandomFromArr,
  };
})();

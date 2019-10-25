'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var photosChooser = document.querySelector('.ad-form__input');
  var photoPreview = document.querySelector('.ad-form__photo');

  var photoHandler = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photoImg = document.createElement('img');
        photoImg.src = reader.result;
        photoPreview.appendChild(photoImg);
      });

      reader.readAsDataURL(file);
    }
  };

  photosChooser.addEventListener('change', function () {
    var files = photosChooser.files;
    photoPreview.innerHTML = '';
    for (var i = 0; i < files.length; i++) {
      photoHandler(files[i]);
    }
  });
})();

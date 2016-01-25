(function() {
    'use strict';

define(['./user.module', 'cordova'], function(user) {
    user.factory('cameraService', cameraService);

    /* @ngInject */
    function cameraService($q, $cordovaCamera) {

        var camera = {
            'getPicture': getPicture
        };
        return camera;

        function getPicture(index) {
            var deferred = $q.defer(),
                options;
              // 选择拍照还是图库    
            if(index === 0) {
                options = {
                    destinationType: Camera.DestinationType.FILE_URI,
                      sourceType: Camera.PictureSourceType.CAMERA
                  };
            } else {
                options = {
                    destinationType: Camera.DestinationType.FILE_URI,
                      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                  };
            }

            $cordovaCamera.getPicture(options).then(function(imageURI) {
                  deferred.resolve(imageURI);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
        
    };
});

})();
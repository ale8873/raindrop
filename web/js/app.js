/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    var app = angular.module('inspinia', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                    // ngSanitize
    ])
    
    app.service('model', function($http) {  	
        this.get = function(model) {
            return $http.get('/index.php/'+model);
        };
        this.post = function (model,data) {
            return $http.post('/index.php/'+model, data);
        };
        this.put = function (model, data) {
            return $http.put('/index.php/'+model + '/' + data.id, data);
        };
        this.delete = function (model, id) {
            return $http.delete('/index.php/'+model + '/' + id);
        };
    });
    
    app.service('changeAvatar', function($uibModal) {  	
        this.modal = function(){
            var modalInstance = $uibModal.open({
                templateUrl: 'views/change_avatar.html',
                controller:'changeAvatarCtrl',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['css/plugins/dropzone/basic.css','css/plugins/dropzone/dropzone.css','js/plugins/dropzone/dropzone.js']
                            },
                            {
                                files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css' ]
                            },
                            {
                                name: 'cgNotify',
                                files: ['css/plugins/angular-notify/angular-notify.min.css','js/plugins/angular-notify/angular-notify.min.js']
                            },
                            {
                                name: 'ngImgCrop',
                                files: ['js/plugins/ngImgCrop/ng-img-crop.js','css/plugins/ngImgCrop/ng-img-crop.css']
                            },
                        ]);
                    }
                }
            });
        }
    });
    
})();

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad
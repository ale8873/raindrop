/**
 * Raindrop
 *
 */
var app_name = "raindrop"; // app module name
(function () {
    var app = angular.module(app_name, [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                    // ngSanitize
    ])
    
    app.filter('contains', function() {
    	return function (array, needle) {
    		if(array){
    			return array.indexOf(needle) >= 0;
    		}
    	}
    });
  	
    app.filter('not_contains', function() {
    	return function (array, needle) {
    		if(array){
    			return array.indexOf(needle) < 0;
    		}
    	}
    });
    
    app.service('model', function($http) {  	
        this.get = function(model,id=null) {
        	if(id){
        		var url = '/index.php/'+model+'/'+id;
        	}
        	else{
        		var url = '/index.php/'+model;
        	}
            return $http.get(url);
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
        this.columns = function (model) {
            return $http.get('/index.php/columns?model='+model);
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
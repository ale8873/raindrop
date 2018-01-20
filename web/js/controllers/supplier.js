function supplierCtrl($scope, model, $filter){
	$scope.label = "Fornitori";
	$scope.single_label = "Fornitore";
	$scope.model_name="supplier";
	$scope.setPrefix = function(){
		$scope.prefix = $filter('filter')($scope.countries, {code: $scope.model.country_code})[0].prefix;
	}
	$scope.loadCountries = function(){
		model.get("countries").then(function (data) {
            if (data.status == 200){
                $scope.countries= data.data;
                if($scope.model){
                	$scope.setPrefix();
                }
            }
        }, function (err) {
            console.log(err);
        }) 
	}
	
	$scope.loadProvinces = function(){
		model.get("provinces").then(function (data) {
            if (data.status == 200){
                $scope.provinces = data.data;
            }
        }, function (err) {
            console.log(err);
        }) 
	}
	
	model.columns($scope.model_name).then(function(data){
		$scope.columns = data.data;
	});
	
}

function supplierGridCtrl($scope, DTOptionsBuilder, model){
	
	$scope.excluded_columns = ['note','country_code','id','city','cap','address','tax_code','fax','pec','vat','province'];
	
	$scope.loadCountries();
	
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: $scope.label},
            {extend: 'pdf', title: $scope.label},
            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);
    
    $scope.get = function(){
        model.get($scope.model_name+"s").then(function (data) {
            if (data.status == 200)
                $scope.models = data.data;
        }, function (err) {
            console.log(err);
        })  	
    }
    $scope.get();
      
    $scope.delete = function(model_to_delete){ 
    	var response = confirm("Sicuro di vole eliminare "+model_to_delete.name+"?");
    	if (response == true) {
    	    model.delete($scope.model_name+"s",model_to_delete.id).then(function (data) {
    	    	$scope.get();
            }, function (err) {
                console.log(err);
            });    	    
    	}
    }
    
}
function supplierCreateCtrl($scope, model, $location){
		
	$scope.loadProvinces();
	
	$scope.$parent.model={};
	$scope.$parent.model.country_code = "IT"
    $scope.loadCountries();
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.post($scope.model_name+"s",$scope.model)
			$location.path("/"+$scope.model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
}

function supplierUpdateCtrl($scope, model, $location, $filter, $stateParams){
	
	$scope.loadProvinces();
	
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.put($scope.model_name+"s",$scope.model)
			$location.path("/"+$scope.model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
    model.get($scope.model_name+"s",$stateParams.id).then(function (data) {
        if (data.status == 200){        
            $scope.$parent.model = data.data;
            $scope.loadCountries();
        }
    }, function (err) {
        console.log(err);
    })       
}

function supplierViewCtrl($http, $scope, model, $filter, $stateParams){
    

	
	$scope.excluded_columns = ['country_code','id','address','city','province','cap','phone','mobile','fax','email','pec'];

	model.get($scope.model_name+"s",$stateParams.id).then(function (data) {
        if (data.status == 200){        
            $scope.$parent.model = data.data;
            // Simple GET request example:
            $http({
              method: 'GET',
              url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+$scope.model.address+","+$scope.model.city+"&key=AIzaSyDQTpXj82d8UpCi97wzo_nKXL7nYrd4G70"
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
            	var location = response.data.results[0].geometry.location;
                $scope.mapOptions = {
                    	zoom: 16,
                        center: new google.maps.LatLng(location.lat, location.lng),
                        // Style for Google Maps
                        styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}],
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                };
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
            $scope.loadCountries();
        }
    }, function (err) {
        console.log(err);
    })     
}

/**
*
* Pass all functions into module
*/
var model_name = "supplier";
angular
   .module(app_name)
   .controller(model_name+'Ctrl', supplierCtrl)
   .controller(model_name+'GridCtrl', supplierGridCtrl)
   .controller(model_name+'CreateCtrl', supplierCreateCtrl)
   .controller(model_name+'UpdateCtrl', supplierUpdateCtrl)
   .controller(model_name+'ViewCtrl', supplierViewCtrl)
 
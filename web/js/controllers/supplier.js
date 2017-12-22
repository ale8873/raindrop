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
            	$scope.setPrefix();
            }
        }, function (err) {
            console.log(err);
        }) 
	}
}

function supplierGridCtrl($scope, DTOptionsBuilder, model){
	
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
		
	$scope.$parent.model={};
	$scope.$parent.model.country_code = "IT"
	
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.post($scope.model_name+"s",$scope.model)
			$location.path("/"+$scope.model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
	$scope.loadCountries();
}

function supplierUpdateCtrl($scope, model, $location, $filter, $stateParams){
	
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.put($scope.model_name+"s",$scope.model)
			$location.path("/"+$scope.model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
    model.get($scope.model_name+"s").then(function (data) {
        if (data.status == 200){        
            $scope.models = data.data;
            $scope.$parent.model = $filter('filter')($scope.models, {id: $stateParams.id})[0];
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
   .module('inspinia')
   .controller(model_name+'Ctrl', supplierCtrl)
   .controller(model_name+'GridCtrl', supplierGridCtrl)
   .controller(model_name+'CreateCtrl', supplierCreateCtrl)
   .controller(model_name+'UpdateCtrl', supplierUpdateCtrl)
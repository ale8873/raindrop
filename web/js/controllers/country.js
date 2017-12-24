function countryCtrl($scope, model, $filter){
	$scope.label = "Nazioni";
	$scope.single_label = "Nazione";
	$scope.model_name="country";
	
	model.columns($scope.model_name).then(function(data){
		$scope.columns = data.data;
	});
	
}

function countryGridCtrl($scope, DTOptionsBuilder, model){
	
	$scope.excluded_columns = ['id'];

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
        model.get("countries").then(function (data) {
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
    	    model.delete("countries",model_to_delete.id).then(function (data) {
    	    	$scope.get();
            }, function (err) {
                console.log(err);
            });    	    
    	}
    }
    
}
function countryCreateCtrl($scope, model, $location){
		
	$scope.$parent.model={};
	$scope.$parent.model.country_code = "IT"
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.post("countries",$scope.model)
			$location.path("/"+$scope.model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
}

function countryUpdateCtrl($scope, model, $location, $filter, $stateParams){
	
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.put("countries",$scope.model)
			$location.path("/"+$scope.model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
    model.get("countries",$stateParams.id).then(function (data) {
        if (data.status == 200){        
            $scope.$parent.model = data.data;
        }
    }, function (err) {
        console.log(err);
    })       
}

function countryViewCtrl($scope, model, $filter, $stateParams){
    
	$scope.excluded_columns = ['id'];

	model.get("countries",$stateParams.id).then(function (data) {
        if (data.status == 200){        
            $scope.$parent.model = data.data;
        }
    }, function (err) {
        console.log(err);
    })     
}

/**
*
* Pass all functions into module
*/
var model_name = "country";
angular
   .module('inspinia')
   .controller(model_name+'Ctrl', countryCtrl)
   .controller(model_name+'GridCtrl', countryGridCtrl)
   .controller(model_name+'CreateCtrl', countryCreateCtrl)
   .controller(model_name+'UpdateCtrl', countryUpdateCtrl)
   .controller(model_name+'ViewCtrl', countryViewCtrl)
 
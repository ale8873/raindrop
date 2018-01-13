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
	
	$scope.excluded_columns = ['note','country_code','id'];
	
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

function supplierViewCtrl($scope, model, $filter, $stateParams){
    
	$scope.excluded_columns = ['country_code'];

	model.get($scope.model_name+"s",$stateParams.id).then(function (data) {
        if (data.status == 200){        
            $scope.$parent.model = data.data;
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
 
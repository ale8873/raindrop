function supplierCtrl($scope,DTOptionsBuilder, model){
	
	var model_name="supplier"
	
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},
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
        model.get(model_name+"s").then(function (data) {
            if (data.status == 200)
                $scope[model_name+"s"] = data.data;
        }, function (err) {
            console.log(err);
        })  	
    }
    $scope.get();
      
    $scope.delete = function(model_to_delete){ 
    	var response = confirm("Sicuro di vole eliminare il fornitore "+model_to_delete.name+"?");
    	if (response == true) {
    	    model.delete(model_name+"s",model_to_delete.id).then(function (data) {
    	    	$scope.get();
            }, function (err) {
                console.log(err);
            });    	    
    	}
    }
    
}
function supplierCreateCtrl($scope, model,$location, $filter){
	
	var model_name = "supplier";	
	
	$scope[model_name]={};
	$scope[model_name].country_code = "IT"
	
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.post(model_name+"s",$scope[model_name])
			$location.path("/"+model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
	$scope.setPrefix = function(){
		$scope.prefix = $filter('filter')($scope.countries, {code: $scope[model_name].country_code})[0].prefix;
	}
	
    model.get("countries").then(function (data) {
        if (data.status == 200){
            $scope.countries= data.data;
            $scope.setPrefix();
        }
    }, function (err) {
        console.log(err);
    })     
}

function supplierUpdateCtrl($scope, model,$location, $filter, $stateParams){

	var model_name = "supplier";
	
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.put(model_name+"s",$scope[model_name])
			$location.path("/"+model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
	$scope.setPrefix = function(){
		$scope.prefix = $filter('filter')($scope.countries, {code: $scope[model_name].country_code})[0].prefix;
	}
	
    model.get(model_name+"s").then(function (data) {
        if (data.status == 200){        
            $scope[model_name+"s"] = data.data;
            $scope[model_name] = $filter('filter')($scope[model_name+"s"], {id: $stateParams.id})[0];
            model.get("countries").then(function (data) {
                if (data.status == 200){
                    $scope.countries= data.data;
                    $scope.setPrefix();
                }
            }, function (err) {
                console.log(err);
            }) 
        }
    }, function (err) {
        console.log(err);
    })       
}

/**
*
* Pass all functions into module
*/

var model_name = "supplier"
angular
   .module('inspinia')
   .controller(model_name+'Ctrl', supplierCtrl)
   .controller(model_name+'CreateCtrl', supplierCreateCtrl)
   .controller(model_name+'UpdateCtrl', supplierUpdateCtrl)
function orderCtrl($scope, model, $filter){
	$scope.label = "Ordini";
	$scope.single_label = "Ordine";
	$scope.model_name="order";
	
	model.columns($scope.model_name).then(function(data){
		$scope.columns = data.data;
	});
	
}

function orderGridCtrl($scope, DTOptionsBuilder, model){
	
	$scope.excluded_columns = ['email','name','total','id','cart','address','city','province','phone','vat'];
	
	$scope.json_parse = function(json){
		return JSON.parse(json);
	}
	
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
        model.get("orders").then(function (data) {
            if (data.status == 200)
                $scope.models = data.data;
        }, function (err) {
            console.log(err);
        })  	
    }
    $scope.get();
      
    $scope.delete = function(model_to_delete){ 
    	var response = confirm("Sicuro di vole eliminare la comanda ?");
    	if (response == true) {
    	    model.delete("orders",model_to_delete.id).then(function (data) {
    	    	$scope.get();
            }, function (err) {
                console.log(err);
            });    	    
    	}
    }
    
}
function orderCreateCtrl($scope, model, $location){
		
	$scope.$parent.model={};
	$scope.$parent.model.order_code = "IT"
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.post("orders",$scope.model)
			$location.path("/"+$scope.model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
}

function orderUpdateCtrl($scope, model, $location, $filter, $stateParams){
	
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.put("orders",$scope.model)
			$location.path("/"+$scope.model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
    model.get("orders",$stateParams.id).then(function (data) {
        if (data.status == 200){        
            $scope.$parent.model = data.data;
        }
    }, function (err) {
        console.log(err);
    })       
}

function orderViewCtrl($scope, model, $filter, $stateParams){
    
	$scope.excluded_columns = ['id'];

	model.get("orders",$stateParams.id).then(function (data) {
        if (data.status == 200){        
            $scope.$parent.model = data.data;
            $scope.$parent.model.cart = JSON.parse($scope.$parent.model.cart)
        }
    }, function (err) {
        console.log(err);
    })     
}

/**
*
* Pass all functions into module
*/
var model_name = "order";
angular
   .module(app_name)
   .controller(model_name+'Ctrl', orderCtrl)
   .controller(model_name+'GridCtrl', orderGridCtrl)
   .controller(model_name+'CreateCtrl', orderCreateCtrl)
   .controller(model_name+'UpdateCtrl', orderUpdateCtrl)
   .controller(model_name+'ViewCtrl', orderViewCtrl)
 
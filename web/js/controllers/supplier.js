function supplierCtrl($scope,DTOptionsBuilder, model){
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
    
    $scope.getSuppliers = function(){
        model.get("suppliers").then(function (data) {
            if (data.status == 200)
                $scope.suppliers = data.data;
        }, function (err) {
            console.log(err);
        })  	
    }
    $scope.getSuppliers();
      
    $scope.delete = function(supplier){ 
    	var response = confirm("Sicuro di vole eliminare il fornitore "+supplier.name+"?");
    	if (response == true) {
    	    model.delete("suppliers",supplier.id).then(function (data) {
    	    	$scope.getSuppliers();
            }, function (err) {
                console.log(err);
            });    	    
    	}
    }
    
}
function supplierCreateCtrl($scope, model,$location, $filter){
	
	$scope.supplier={};
	$scope.supplier.country_code = "IT"
	
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.post("suppliers",$scope.supplier)
			$location.path("/supplier/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
	$scope.setPrefix = function(){
		$scope.prefix = $filter('filter')($scope.countries, {code: $scope.supplier.country_code})[0].prefix;
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

function supplierUpdateCtrl($scope, model,$location, $filter){
     
}

/**
*
* Pass all functions into module
*/
angular
   .module('inspinia')
   .controller('supplierCtrl', supplierCtrl)
   .controller('supplierCreateCtrl', supplierCreateCtrl)
   .controller('supplierUpdateCtrl', supplierCreateCtrl)
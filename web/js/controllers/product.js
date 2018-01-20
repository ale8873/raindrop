function productCtrl($http, $scope, model, $filter){
	$scope.label = "Prodotto";
	$scope.single_label = "Prodotti";
	$scope.model_name="product";
	$scope.searchEan = function(){
		// Simple GET request example:
		$http({
		  method: 'GET',
		  url: 'https://api.keepa.com/product?key=&domain=8&code='+$scope.model.ean
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
			if(response.data.products[0]){
				$scope.model.title = response.data.products[0].title;
				$scope.model.image = 'https://images-na.ssl-images-amazon.com/images/I/'+response.data.products[0].imagesCSV;
			}
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
	

	
	$scope.openKCFinder_singleFile = function() {
	    window.KCFinder = {};
	    window.KCFinder.callBack = function(url) {
	    	$scope.model.image = url;
	    	$scope.$apply();
	        // Actions with url parameter here
	        window.KCFinder = null;
	    };
	    window.open('/kcfinder/browse.php', 'kcfinder_single',"toolbar,scrollbars,resizable,top=0,left=0,width=800,height=800");
	}
	
	model.columns($scope.model_name).then(function(data){
		$scope.columns = data.data;
	});
	
    model.get("product-categories").then(function (data) {
        if (data.status == 200)
            $scope.categories = data.data;
    }, function (err) {
        console.log(err);
    }) 
	
}

function productGridCtrl($scope, DTOptionsBuilder, model){

	$scope.excluded_columns = ['id','image','description','ean'];

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
        model.get("products").then(function (data) {
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
    	    model.delete("products",model_to_delete.id).then(function (data) {
    	    	$scope.get();
            }, function (err) {
                console.log(err);
            });    	    
    	}
    }
    
}
function productCreateCtrl($scope, model, $location){
		
	$scope.$parent.model={};
	$scope.$parent.model.product_code = "IT"
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.post("products",$scope.model)
			$location.path("/"+$scope.model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
}

function productUpdateCtrl($scope, model, $location, $filter, $stateParams){
	
	$scope.save = function(){
		if ($scope.form.$valid) {
			model.put("products",$scope.model)
			$location.path("/"+$scope.model_name+"/grid");
        } else {
            $scope.form.submitted = true;
        }
	}
	
    model.get("products",$stateParams.id).then(function (data) {
        if (data.status == 200){        
            $scope.$parent.model = data.data;
        }
    }, function (err) {
        console.log(err);
    })       
}

function productViewCtrl($scope, model, $filter, $stateParams){
    
	$scope.excluded_columns = ['id','image'];

	model.get("products",$stateParams.id).then(function (data) {
        if (data.status == 200){        
            $scope.$parent.model = data.data;
        }
    }, function (err) {
        console.log(err);
    })     
}

function productBitcoinCtrl($scope,bitcoin_cart_total,$uibModalInstance,checkout){
	$scope.bitcoin_cart_total = bitcoin_cart_total;
    $scope.ok = function () {
        $uibModalInstance.close();
        checkout();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function productCartCtrl($scope, model, $filter, $location,$uibModal){
	  
	  $scope.order = {};
	  
	  $scope.bitcoin = function(){
		  var modalInstance = $uibModal.open({
			  templateUrl: 'views/product/cart/bitcoin.html',
			  controller: 'productBitcoinCtrl',
			  resolve: {
				  bitcoin_cart_total: function () {
	                  return $scope.bitcoin_cart_total;
	              },
		  		  checkout: function () {
              		return $scope.checkout;
          		  }
	          }	  
	      });
	  }
	  
	  $scope.cash = function(){
		  var modalInstance = $uibModal.open({
			  templateUrl: 'views/product/cart/bitcoin.html',
			  controller: 'productBitcoinCtrl',
			  resolve: {
				  bitcoin_cart_total: function () {
	                  return $scope.bitcoin_cart_total;
	              },
		  		  checkout: function () {
              		return $scope.checkout;
          		  }
	          }	  
	      });
	  }
	  
      $scope.checkout = function(){
    	  $scope.order.total = $scope.cart_total;
    	  $scope.order.cart = JSON.stringify($scope.cart);
    	  model.post("orders",$scope.order);
    	  $scope.emptyCart();
    	  $location.path("/order/grid");
      }
}

/**
*
* Pass all functions into module
*/
var model_name = "product";
angular
   .module(app_name)
   .controller(model_name+'Ctrl', productCtrl)
   .controller(model_name+'GridCtrl', productGridCtrl)
   .controller(model_name+'CreateCtrl', productCreateCtrl)
   .controller(model_name+'UpdateCtrl', productUpdateCtrl)
   .controller(model_name+'ViewCtrl', productViewCtrl)
   .controller(model_name+'CartCtrl', productCartCtrl)
   .controller(model_name+'BitcoinCtrl', productBitcoinCtrl)
 
function loginsCtrl($scope, $http, $location, $rootScope, notify) {
	$scope.login = function() {
		$scope.data = {
			LoginForm : {
				username : $scope.username,
				password : $scope.password
			}
		}
		return $http({method : 'POST',
				url : 'index.php/login',
				data : $scope.data,
		}).then(function successCallback(response) {
			$rootScope.profile = response.data[0];
			$location.path("/dashboards/dashboard_1");
		}, function errorCallback(response) {
			notify({
			    message:'Wrong username or password',
			    classes: 'alert-info'
			}); 
		});
	}
}

function logoutCtrl($scope, $http, $location, $rootScope) {
	return $http({method : 'POST',
		url : 'index.php/logout',
		data : $scope.data,
	}).then(function successCallback(response) {
		delete $rootScope.profile;
		$location.path("/logins");
	}, function errorCallback(response) {
		notify({
			message:'error php',
			classes: 'alert-info'
		}); 
	});
}

/**
*
* Pass all functions into module
*/
angular
   .module('inspinia')
   .controller('loginsCtrl', loginsCtrl)
   .controller('logoutCtrl', logoutCtrl)
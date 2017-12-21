function changeAvatarCtrl($scope, $uibModalInstance,notify, model) {	
    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    
    $uibModalInstance.rendered.then(function() {
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    });
    
    $scope.ok = function () {
    	if($scope.myImage!=''){
    		$scope.profile.image = $scope.myCroppedImage; 
    		model.put("profiles",$scope.profile);
    		$uibModalInstance.close();
    	}
    	else{
			notify({
			    message:'Selezionare un immagine',
			    classes: 'alert-info'
			});
    	}
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function profileCtrl($scope) {
	
}

/**
*
* Pass all functions into module
*/
angular
   .module('inspinia')
   .controller('changeAvatarCtrl', changeAvatarCtrl)
   .controller('profileCtrl', profileCtrl)
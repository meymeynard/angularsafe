(function(){
var module = angular.module('sidebar_module', []);

module.controller('SidebarCtrl', [
    '$scope', 
    '$location',
    function($scope, $location){
        $scope.changePath = function(path){
            if ($location.path()==='/'){
                $location.path(path);
            }else{
                $location.path('/');
            }
        }
    }
]);

module.controller('Menu1Ctrl', [ 
    '$scope', 
    '$location', 
    function($scope, $location){
        
    }
]);
})();
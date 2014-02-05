(function(){
var module = angular.module('noahApp', [
    'map_module',
    'window_module'
    ]);
    
module.run(
    function($rootScope, $window){
        function initWindowSize(){
            $rootScope.windowHeight = $window.innerHeight;
            $rootScope.windowWidth = $window.innerWidth;
        }; 
        initWindowSize();
        
        angular.element($window).bind('resize', function(){
            initWindowSize();
            $rootScope.$apply();
        });
    }
);
})();
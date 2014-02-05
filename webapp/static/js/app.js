(function(){
var module = angular.module('noahApp', [
    'map_module',
    'window_module',
    'toolbar_module',
    'sidebar_module'
    ]);
    
module.config([
    '$routeProvider',
    function($routeProvider){
        $routeProvider.
        when('/', {
            controller: 'SidebarCtrl',
            template: ''
        }).when('/menulevel1', {
            controller: 'Menu1Ctrl',
            templateUrl:'/api/menulevel1'
        }).when('/menulevel2', {
            controller: 'Menu2Ctrl',
            templateUrl:'/api/menulevel2'
        }).otherwise({redirectTo:'/'});
    }
])
    
module.run(
    function($rootScope, $window){
        //set some global defaults
        $rootScope.map = null;
        
    
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
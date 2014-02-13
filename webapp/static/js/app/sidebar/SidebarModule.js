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

module.controller('FileTreeCtrl', [
    '$scope',
    '$element',
    function ($scope, $element){
    
        $($element).fileTree({ script: "http://localhost:5000/filetree" }, function(file) {
            //Note: this is a weak way of determining the layer type
            /*
            var type = (file.indexOf("/hazard/") != -1) ? "hazard" : "exposure";

            //gets a GeoJson of the layers of clicked layer item in the file tree and overlays them in the map
            $.getJSON('/layers', {filename: file}, function(geojsonFeature){
                var color = (type == "hazard") ? "#E5743D" : "#009999";
                var index = (type == "hazard") ? 1 : 0;
                var myLayer = L.geoJson(geojsonFeature, {style: {"color": color, "weight": 1}}).addTo(map);
            
                if (layers[index] != null){
                    map.removeLayer(layers[index]);
                    map.removeLayer(layers[2]);
                    console.log(layers);
                }
            
                layers[index] = myLayer;
                map.fitBounds(myLayer.getBounds());
            });

            //update the layer info fields when the user clicks on a file in the file tree
            $.post("/layers", {filename: file, layer_type: type})
                .done(function(data){
                    data.file = file;
                    if (type=='exposure'){
                        $scope.$apply(angular.copy(data, Exposure));
                    }else{
                        $scope.$apply(angular.copy(data, Hazard));
                    }
                })
                .fail(function(){ alert("Failed to load the impact layer!"); });
            */
        });
    }
]);
})();
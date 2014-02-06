(function(){
var attribution = null;
var layers = [];

//some default configurations for the map
var center = [122.011870, 12.151436];
var zoom = 6;
var maxZoom = 13;


var module = angular.module('map_service', []);

module.controller('MapCtrl', function($scope, $rootScope){
    attribution = new ol.Attribution({
        html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
    });
    
    layers.push(
        new ol.layer.Tile({
            visible: true,
            source: new ol.source.XYZ({
                attributions: [ attribution ],
                url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
                        'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            })
        })
    );
    
    //this initializes the map
    $rootScope.map = new ol.Map({
        target: 'map',
        layers: layers,
        renderer: ol.RendererHint.CANVAS,
        view: new ol.View2D({
            center: ol.proj.transform(center, 'EPSG:4326', 'EPSG:3857'),
            zoom: zoom,
            maxZoom: maxZoom
        })
    });
});
})();
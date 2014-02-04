(function(){
var map = null;
var attribution = null;
var layers = [];
var module = angular.module('map_service', []);

module.controller('MapCtrl', function($scope){
    attribution = new ol.Attribution({
        html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
    });

    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: [attribution],
                    url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
                        'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                })
            })
        ],
        renderer: ol.RendererHint.CANVAS,
        view: new ol.View2D({
            center: ol.proj.transform([122.011870, 12.151436], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6,
            maxZoom: 13
        })
    });
});
})();
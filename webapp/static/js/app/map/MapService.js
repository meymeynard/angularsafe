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
    
    //this updates the map size when the window is resized
    $rootScope.$watch('windowHeight',function(newVal, oldVal){
        var mapHeight = newVal - 
                        $('.navbar').height() - 
                        $('#footer').height();
        var mapContainer = $('#map');
        var sideMenuHeight = mapHeight - $('#toolbar').height();
        
        mapContainer.height(mapHeight);
        $rootScope.map.updateSize();
        if ($('#sidemenu')) { $('#sidemenu').css('height', sideMenuHeight); }
        //if ($('#menulevel1')) { //$('#menulevel1').css('height', sideMenuHeight); }
        //if ($('#menulevel2')) { //$('#menulevel2').css('height', sideMenuHeight); }
    });
});
})();
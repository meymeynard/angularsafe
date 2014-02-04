
            function MapCtrl($scope){
                var map = new ol.Map({
                    target: 'map',
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        })
                    ],
                    view: new ol.View2D({
                        center: ol.proj.transform([122.011870, 12.151436], 'EPSG:4326', 'EPSG:3857'),
                    zoom: 6,
                    maxZoom: 13
                    })
                });
            }

/*
function MapCtrl($scope){
var map;
var layers = [];
layers.push(
        new ol.layer.Tile({
            visible: true,
            preload: Infinity,
            source: new ol.source.XYZ({
                attributions: [
                    new ol.Attribution({
                        html: 'Tiles &copy; '+
                        '<a href="http://services.arcgisonline.com'+
                        '/ArcGIS/rest/services/World_Topo_Map/MapServer">'+
                        'ArcGIS</a>'
                    })
                ],
                url: 'http://server.arcgisonline.com'+
                    '/ArcGIS/rest/services/World_Topo_Map'+
                    '/MapServer/tile/{z}/{y}/{x}'
            })
        })
    );
    
    map = new ol.Map({
        target: 'map',
        renderer: ol.RendererHint.CANVAS,
        //renderers: ol.RendererHints.createQueryFromData(),
        view: new ol.View2D({
            center: ol.proj.transform(
                [122.011870, 12.151436], 
                'EPSG:4326', 
                'EPSG:3857'
            ),
            zoom: 6,
            maxZoom: 13
        })
    });
}
*/
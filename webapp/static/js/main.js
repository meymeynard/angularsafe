var menuLvl1 = $('#menulevel1');
var menuLvl2 = $('#menulevel2');
var menuLvl1Under = $('#menulevel1 div');
var menuLvl2Under = $('#menulevel2 div');
var floodWeatherMenu = $('#flood_weather');
var floodWeatherSelect = $('#flood_weather li');
var floodWeatherClicked;
var level2Select = $('.content li');
var styles = [
	'ArcGIS Online',
	'Bing Maps Road',
	'Bing Maps Aerial',
	'Bing Maps Aerial with Labels'
];

/*
$('#layer-select').change(function() {
  var style = $(this).find(':selected').val();
  var i, ii;
  for (i = 0, ii = layers.length; i < ii; ++i) {
    layers[i].setVisible(styles[i] == style);
  }
});
$('#layer-select').trigger('change');
*/

// function for search button
function showSearchResult() {

  var place = this.getPlace();
  var duration = 5000;
  var start = +new Date();
  var viewMap2d = map.getView().getView2D();

  var pan = ol.animation.pan({
      duration: duration,
      source: viewMap2d.getCenter(),
      start: start
  });

  var bounce = ol.animation.bounce({
      duration: duration,
      resolution: 4 * viewMap2d.getResolution(),
      start: start
  });

  map.beforeRender(pan, bounce);
 
  viewMap2d.setCenter(
    ol.proj.transform(
	[
		place.geometry.location[Object.keys(place.geometry.location)[1]],
		place.geometry.location[Object.keys(place.geometry.location)[0]]
	],
	'EPSG:4326', 
	'EPSG:3857'
    )
  );

  viewMap2d.setZoom(13);
}

$(function(){
	//$menuLvl1Under.css('left', '-260px').hide();
	menuLvl2Under.hide();
	menuLvl1Under.hide();
	// set the css first, then we can resize later
	menuLvl1.css('width', '0');
	menuLvl2.css('width', '0');
	//menuLvl1.hide();
	//menulvl2.hide();
	$(window).bind('resize', function(){
		fixUIHeight();
	}).trigger('resize');

	// for autocomplete of search item
	google.maps.event.addListener(
		new google.maps.places.Autocomplete(
		 document.getElementById('area')),
		'place_changed',
		showSearchResult
	);
});



$(floodWeatherSelect).hover(
	function() {
		//$(this).css('color', '#5FC5FF');
		$(this).addClass('selected-flood');
	},
	function() {
		//$(this).css('color', '#008EF1');
		$(this).removeClass('selected-flood');
	}
);

$(level2Select).hover(
	function() {
		//$(this).css('color', '#5FC5FF');
		$(this).addClass('selected-flood');
	},
	function() {
		//$(this).css('color', '#008EF1');
		$(this).removeClass('selected-flood');
	}
);

$('#floodbutton').click(function(e){
	e.preventDefault();
	//menuLvl1.removeClass('toggle');
	if (!$(this).hasClass('on')) {
		menuLvl1.animate(
			{width: '188px'},
			300,
			function() {
				floodWeatherMenu.fadeToggle('fast');
			}
		);
		/*
		$floodWeatherMenu.animate(
			{left : '60px'}, 600
		);//.fadeToggle('fast');
		*/

		$(this).addClass('on');
	} else {
		floodWeatherMenu.fadeToggle('fast', function(){
			menuLvl1.animate({width: '0'}, 300);
		});

		$(this).removeClass('on');
	}
	return false;

	/*
	$floodWeatherMenu.animate(
		{left : parseInt($floodWeatherMenu.css('left'), 10) == -260 ?
		60 : -260
	}).fadeIn('fast');*/
	//$floodWeatherMenu.animate({width : '200px'}, 600);
	//$floodWeatherMenu.css('width', '200px').fadeIn('slow');
	//menuLvl1.show('slide', { direction : 'left' }, 600);
	/*
	menuLvl1.animate({left : parseInt(menuLvl1.css('left'), 10000) == 60 ?
		$menuLvl1.outerWidth() : 60
	});*/
});

$(floodWeatherSelect).click(function(e){
	e.preventDefault();
	var clicked = $(this).find('input:radio');
	clicked.prop('checked', true);
	floodWeatherClicked = clicked.val();
	console.log('clicked: ', clicked.val());
	//console.log(floodWeatherClicked == 'river_inundation');
	if (
		floodWeatherClicked == 'river_inundation' ||
		floodWeatherClicked == 'tide_levels') {
			// do nothing
	} else {
			$('.content').show();
			menuLvl2.animate(
				{width: '188px'},
				300,
				function() {
					menuLvl1.fadeToggle('fast');
					$('#' + floodWeatherClicked).fadeIn(300);
			}
		);
	}
});

$('a.return').click(function(e){
	e.preventDefault();
	$('#' + floodWeatherClicked).fadeOut(300);
	$('.content').hide();
	menuLvl1.fadeToggle('fast');
	menuLvl2.animate(
		{width : '0'},
		300,
		function(){
			//menuLvl1.fadeToggle('fast');
		}
	);
	// on return, suggest to clear all radio button selections
});
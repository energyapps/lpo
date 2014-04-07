var markers = new L.MarkerClusterGroup({
    maxClusterRadius:  10
});

var layer1 = 1;
// var	index = 0;	
//create empty array to push into
var raw = [];

//Create empty variable to store "this" DOM element in
var t;

var map = L.mapbox.map('map', 'energy.hi9a3ng2',{
      maxZoom: 9,
      minZoom: 3
    });

map.setView([43.908, -94.525], 4);

map.on('click', resetStyle);


(function ($) {

	$(document).ready(function() { 
		buildMap();				
		// removal();

		$('.buttn').click(function (e) {
	      $('.buttn').removeClass('active');
	      $(this).addClass('active');
			t = this;
			// removal();
			buildMap();
		});

	});
}(jQuery));

function buildMap() {

	if (t !== undefined) {
		// map.removeLayer(markers); //why doesn't this work?
		markers.clearLayers();
	};
	if (t !== undefined) {
	};
	for (var i = 0; i < data.features.length; i++) {

		var icon = "circle";
		var color = "";

	    var a = data.features[i];	
	    var b = data.features[i].properties;

	    if (t == undefined || t.id == "firstbutton") {
	    	if (b.status == "Discontinued") {
		    	var icon = "cross"
		    }; 

		    if (b.type == "1703") {
				var color = "d1803f"
		    } else if (b.type == "1705") {
				var color = "d13f90"
		    } else if (b.type == "ATVM") {
				var color = "3f90d1"
		    };
		    
		    var content = "<h2>" + a.properties.name + "</h2>" + 
		    				"<p>Loan: " + a.properties.loan_amt + "</p>" +
		    			"<p>Jobs: " + a.properties.jobs + "</p>";

		    var marker = L.marker(
		      new L.LatLng(a.geometry.coordinates[1], a.geometry.coordinates[0]), {
		        icon: L.mapbox.marker.icon({
		          'marker-symbol': icon, 
		          'marker-color': color,
		          'marker-size': 'small'
		        }),
		        title: a.properties
		    })
		    .on('click', resetStyle)
		    .on('click', changeStyle);
		    marker.bindPopup(content);
		    markers.addLayer(marker);
	    }
	    else if (t.id == b.type2) {
	    	if (b.status == "Discontinued") {
		    	var icon = "cross"
		    }; 

		    if (b.type == "1703") {
				var color = "d1803f"
		    } else if (b.type == "1705") {
				var color = "d13f90"
		    } else if (b.type == "ATVM") {
				var color = "3f90d1"
		    };
		    
		    var content = "<h2>" + a.properties.name + "</h2>" + 
		    				"<p>Loan: " + a.properties.loan_amt + "</p>" +
		    			"<p>Jobs: " + a.properties.jobs + "</p>";

		    var marker = L.marker(
		      new L.LatLng(a.geometry.coordinates[1], a.geometry.coordinates[0]), {
		        icon: L.mapbox.marker.icon({
		          'marker-symbol': icon, 
		          'marker-color': color,
		          'marker-size': 'small'
		        }),
		        title: a.properties
		    })
		    .on('click', resetStyle)
		    .on('click', changeStyle);
		    marker.bindPopup(content);
		    markers.addLayer(marker);
	    };
		   
	}

	map.addLayer(markers);
	
}

//Remove the map points
function removal() {


};

function changeStyle(e) {
  // index += 1;

// change newly clicked
	var icon = "circle";
	var color = "";
	var b = e.target.options.title;

    if (b.status == "Discontinued") {
    	var icon = "cross"
    }; 

    if (b.type == "1703") {
		var color = "d1803f"
    } else if (b.type == "1705") {
		var color = "d13f90"
    } else if (b.type == "ATVM") {
		var color = "3f90d1"
    };

	e.target.setIcon(L.mapbox.marker.icon({
	          'marker-size': 'large',
	          'marker-color': color,
	          'marker-symbol': icon
	}));

  layer1 = this;
    
    //auto pan to marker
    var location = e.latlng;
    map.panTo([location.lat,location.lng]);

}
    
function resetStyle() {
	if (layer1 !== 1) {
// what to do with the old one?? use 'this' i think
		var icon = "circle";
		var color = "";
		var b = layer1.options.title;

	    if (b.status == "Discontinued") {
	    	var icon = "cross"
	    }; 

	    if (b.type == "1703") {
			var color = "d1803f"
	    } else if (b.type == "1705") {
			var color = "d13f90"
	    } else if (b.type == "ATVM") {
			var color = "3f90d1"
	    };

		layer1.setIcon(L.mapbox.marker.icon({
	          'marker-size': 'small',
	          'marker-color': color,
	          'marker-symbol': icon
	        }));
	}

}


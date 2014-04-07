var markers = new L.MarkerClusterGroup({
    maxClusterRadius:  10
});

//create empty array to store "this" click element
var layer1 = 1;


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

		$('.buttn').click(function (e) {
	      $('.buttn').removeClass('active');
	      $(this).addClass('active');
			t = this;
			buildMap();
			map.setView([43.908, -94.525], 4);

// map.fitBounds([
//           [42.461, -56.979],[32.536, -114.4]
//          ]);

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
		    
		    var content = 
				"<div id='tiptop'>" +
	    			"<h2>" + a.properties.name + "</h2>" + 
	    				"<p><span class='av-font'>LOCATION</span>: " + a.properties.location + "</p>" +
						"<p><span class='av-font'>LOAN</span>: " + a.properties.loan_amt + "</p>" +
						"<p><span class='av-font'>JOBS (Permanent/Construction)</span>: " + a.properties.jobs + "</p>" +
						"<p><span class='av-font'>TECHNOLOGY</span>: " + a.properties.technology + "</p>" +			    			
				"</div>" +
				"<div id='tipbottom'>" +
					"<div id='styletype'>" +
						"<p><span class='av-font'>PROGRAM: " + a.properties.type + "</span></p>" +
					"</div>" + 
					"<div id='moreinfo'>" + 
						"<a href='http://energy.gov/node/"+ a.properties.node +"'>More Information</a>" + 
					"</div>" +
				"</div>"
				;

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
		    
			var content = 
				"<div id='tiptop'>" +
	    			"<h2>" + a.properties.name + "</h2>" + 
	    				"<p><span class='av-font'>LOCATION</span>: " + a.properties.location + "</p>" +
						"<p><span class='av-font'>LOAN</span>: " + a.properties.loan_amt + "</p>" +
						"<p><span class='av-font'>JOBS (Permanent/Construction)</span>: " + a.properties.jobs + "</p>" +
						"<p><span class='av-font'>TECHNOLOGY</span>: " + a.properties.technology + "</p>" +			    			
				"</div>" +
				"<div id='tipbottom'>" +
					"<div id='styletype'>" +
						"<p><span class='av-font'>PROGRAM: " + a.properties.type + "</span></p>" +
					"</div>" + 
					"<div id='moreinfo'>" + 
						"<a href='http://energy.gov/node/"+ a.properties.node +"'>More Information</a>" + 
					"</div>" +
				"</div>"
				;

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
    map.panTo([location.lat + 2,location.lng]);

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


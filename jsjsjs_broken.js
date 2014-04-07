// var markers = new L.MarkerClusterGroup({
//         maxClusterRadius:  10
//     });
var markers_All = new L.MarkerClusterGroup({
        maxClusterRadius:  10
    });
// var markers_1703 = new L.MarkerClusterGroup({
//         maxClusterRadius:  10
//     });
// var markers_1705 = new L.MarkerClusterGroup({
//         maxClusterRadius:  10
//     });
// var markers_ATVM = new L.MarkerClusterGroup({
//         maxClusterRadius:  10
//     });
var placeholder;

//placeholder for 'this' click
var layer1 = 1;

//Create empty variable to store "this" DOM element in
var t;

var map = L.mapbox.map('map', 'energy.hi9a3ng2',{
      maxZoom: 9,
      minZoom: 3
    });

map.setView([43.908, -94.525], 4);

map.on('click', resetStyle);

// function separate() {

// //loop through and separate into three groups
// 	for (var i = 0; i < data.features.length; i++) {
// 		var a = data.features[i];

// 		//push to all
// 		temp_all.push(a)

// 	    if (a.properties.type == "1703") {
// 	    	temp_1703.push(a)
// 	    } else if (a.properties.type == "1705") {
// 	    	temp_1705.push(a)
// 	    } else if (a.properties.type == "ATVM") {
// 	    	temp_ATVM.push(a)
// 	    };
// 	};	
// 	// console.log(temp_all)
// 	// console.log(temp_1703)
// 	// console.log(temp_1705)
// 	// console.log(temp_ATVM)
// }

function separateAndbuildLayers() {

	for (var i = 0; i < data.features.length; i++) {

		var icon = "circle";
		var color = "";

	    var a = data.features[i];	
	    var b = data.features[i].properties;

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
	    // marker.bindPopup(content);
	    markers_All.addLayer(marker);
	    
	    if (b.type == "1703") {
			markers_1703.addLayer(marker);
	    } else if (b.type == "1705") {
			markers_1705.addLayer(marker);
	    } else if (b.type == "ATVM") {
			markers_ATVM.addLayer(marker);			
	    };

	}
		console.log(markers_All)
		console.log(markers_1703)
	    console.log(markers_1705)
	    console.log(markers_ATVM)
}

//Remove the map points
function removal() {
	if (t == undefined) {
		map.removeLayer(markers_All); 
	} else {
		map.removeLayer(placeholder);
	};

	
};

function buildMap() {
	if (t == undefined) {
		map.addLayer(markers_All);	
		console.log('asdf')
	} else {
		map.addLayer(placeholder);
	};
};

function changeStyle(e) {


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



(function ($) {

	$(document).ready(function() { 
		separateAndbuildLayers();

		map.addLayer(markers_All);

		// buildMap();		

		$('.buttn').click(function (e) {
	      $('.buttn').removeClass('active');
	      $(this).addClass('active');
			// removal();
			t = this;						

			if (t.id == "firstbutton") {placeholder = markers_All}
			else if (t.id == "secondbutton") {placeholder = markers_1703}
			else if (t.id == "thirdbutton") {placeholder = markers_1705}
			else if (t.id == "fourthbutton") {placeholder = markers_ATVM};
			// map.addLayer(placeholder);

			// buildMap();
		});

	});
}(jQuery));

var marker = null;
var beginning = new google.maps.LatLng( gon.start_lat, gon.start_long );
var path;

function initialize() {
  var paper_format = [
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#021019"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#08304b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c4152"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b434f"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b3d51"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "color": "#146474"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    }
]

  var centerPosition = new google.maps.LatLng(0,0);
  var mapOptions = {
    center: centerPosition,
    mapTypeControl: false,
    zoom: 1,
    streetViewControl: false,
    styles: paper_format
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  var panoramaOptions = {
    position: beginning,
    addressControl: false,
    pov: {
      heading: 34,
      pitch: 10
    }
  };
  var panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"), panoramaOptions);

  var guessMapOptions = {
    zoom: 2,
    center: centerPosition,
    streetViewControl: false
  };

  var gMap = new google.maps.Map(document.getElementById('guessMap'), guessMapOptions);

  var guessLine = new google.maps.Polyline({
    geodesic: false,
    strokeColor: '#FF0000',
    strokeOpacity: 0.5,
    strokeWeight: 2
  });

  guessLine.setMap(gMap);

  google.maps.event.addListener(map, 'click', function(e) {
    marker = placeMarker(e.latLng, map, marker);
    path = guessLine.getPath();
    path.clear();
    path.push(beginning);
    path.push(marker.position);
  });
}


function zoomToObject(obj){
    var bounds = new google.maps.LatLngBounds();
    var points = obj.getPath().getArray();
    for (var n = 0; n < points.length ; n++){
        bounds.extend(points[n]);
    }
    gMap.fitBounds(bounds);
    setTimeout(function() {
                google.maps.event.trigger(gMap,'resize');
                gMap.fitBounds(bounds);
                }, 200);
}

function placeMarker(position, map, marker) {
  if(marker !== null) {
    marker.setMap(null);
    marker = null;
  }
  marker = new google.maps.Marker({
    position: position,
    map: map,
    draggable:true,
    animation: google.maps.Animation.DROP
  });
  map.panTo(position);
  return marker;
}

function submitGuess() {
  if (marker === null) {
    alert("Guess first, dum-dum!");
    return false
  } else {
    var $form = $('#new_score')
    $('#score_coord1').val(marker.position);
    $('#score_coord2').val(beginning);
    return true
  }
};

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {
  $('#new_score').submit(function(event) {
    if(submitGuess() == true){

      var url = $(this).attr('action');

      $.ajax({
        type: 'POST',
        url: url,
        data: $('#new_score').serialize(),
        success: function (data) {

        }
      });

      return false;

    } else {
      return false;
    }
  });
});

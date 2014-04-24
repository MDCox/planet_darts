function initialize() {
  var marker = null;
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
    zoom: 1,
    streetViewControl: false,
    styles: paper_format
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  var location = new google.maps.LatLng( gon.start_lat, gon.start_long );

  var panoramaOptions = {
    position: location,
    pov: {
      heading: 34,
      pitch: 10
    }
  };
  var panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"), panoramaOptions);

  google.maps.event.addListener(map, 'click', function(e) {
    marker = placeMarker(e.latLng, map, marker);

  });
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

google.maps.event.addDomListener(window, 'load', initialize);

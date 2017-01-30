

var GoogleMapApi = (function(){

  var shared = {};
    
  var map, infoWindow;//, geocoder;

  var centerPoint = {
      lat: 32.7799072,
      lng: -79.9337208
  };

  function initMap() {
    infowindow = new google.maps.InfoWindow();
    // geocoder = new google.maps.Geocoder();


    map = new google.maps.Map(document.getElementById('map'), {
      center: centerPoint,
      zoom: 13
    });


    // geocoder.geocode({
    //   'address': "812 Lambert Drive, Atlanta"
    // }, function(results, status) {
    //   if (status == 'OK') {
    //     console.log(results);
    //     map.setCenter(results[0].geometry.location);
    //   } else {
    //     console.warn("geocode didnt work");
    //   }
    // })

    var image = {
        url: '../assets/img/home.png',
        // This marker is 32 pixels wide by 32 pixels high.
        size: new google.maps.Size(32, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(15, 32)
    };
    
    var marker = new google.maps.Marker({
      position:centerPoint,
      map: map,
      icon: image,
      animation: google.maps.Animation.DROP
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('My Airbnb');
        infowindow.open(map, this);
    });
  };
  

  function createInfoWindow(place, marker) {
    var contentString = `<h3 class="marker-title">${place.title}<h3>`
    infowindow.setContent(contentString);
  };

  function getPlaceById(id, callback, place) {
    var request = {
      placeId: id
    };

    var service = new google.maps.places.PlacesService(map);
    service.getDetails(request, function(place, status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        callback(place);
        createMarkerFromPlaceId(place);
      } else {
        console.warn("bad places search");
      }
    });
  }


  function createMarkerFromPlaceId(place) {

    
    place.marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
      animation: google.maps.Animation.DROP
    });
    
    google.maps.event.addListener(place.marker, 'click', function() {
        createInfoWindow(place, place.marker);
        infowindow.open(map, this);
    });
    
  };

 
  $('form[name=search] button').click(function(event) {
    event.preventDefault();
    search();
    console.log("form submitted");
  });

    
  return {
    init: initMap,
    createMarkerFromPlaceId: createMarkerFromPlaceId,
    getPlaceById: getPlaceById
  };

}());


var GoogleMapApi = (function(){

  var shared = {};
    
  var map, infoWindow;//, geocoder;

  var centerPoint = {
      lat: 32.7799072,
      lng: -79.9337208
  };

  function initMap() {
    infowindow = new google.maps.InfoWindow();
  
    map = new google.maps.Map(document.getElementById('map'), {
      center: centerPoint,
      zoom: 13
    });

    var homeIcon = {
        url: '/../assets/img/home.png',
        // This marker is 32 pixels wide by 32 pixels high.
        size: new google.maps.Size(80, 80),
        // The origin for this homeIcon is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this homeIcon is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(50, 55)
    };
    
    var marker = new google.maps.Marker({
      position:centerPoint,
      map: map,
      icon: homeIcon,
      animation: google.maps.Animation.DROP
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('My Airbnb - 123 func street, Charleston, SC, 12345');
        infowindow.open(map, this);
    });
  };
  

  function createInfoWindow(place, marker) {
    var contentString = `<h3 class="marker marker_title">${place.name}<h3></br>
    <address class="marker marker_address">${place.formatted_address}</adress></br><a class="marker marker_tele" href="tel:${place.formatted_phone_number}">${place.formatted_phone_number}</a></br><span class="marker marker_rating">${place.rating} stars</span>`
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


  function hidePin(pin) {
    pin.setMap(null);
  }
  function showPin(pin) {
    pin.setMap(map);
  }


  function createMarkerFromPlaceId(place) {

    var placeIcon = {
        url: '../assets/img/place.png',
        // This marker is 32 pixels wide by 32 pixels high.
        size: new google.maps.Size(60, 60),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(50, 60)
    };

    
    place.marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
      icon: placeIcon,
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

    
  return { //This exposes GoogleMapApi so you can call it's functions in other places
    init: initMap,
    createMarkerFromPlaceId: createMarkerFromPlaceId,
    getPlaceById: getPlaceById,
    hidePin: hidePin,
    showPin: showPin,
  };

}());
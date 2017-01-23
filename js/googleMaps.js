

var GoogleMapApi = (function(){

   var shared = {};
    
  var map, infoWindow;

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
  
  function createMarker(result) {
    var marker = new google.maps.Marker({
      position: result.geometry.location,
      map: map,
      title: result.name,
      animation: google.maps.Animation.DROP
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        createInfoWindow(result, marker);
        infowindow.open(map, this);
    });
  };

  function createInfoWindow(result, marker) {
    var contentString = `<h3 class="marker-title">${result.title}<h3>`
    infowindow.setContent(contentString);
  };


  function search() {
    var searchItem = $("form input[name=query]").value;
    var request = {
      location: centerPoint,
      radius: '5',
      query: searchItem,
      openNow:true
    };

    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, processPlacesResults);
  }

 
  $('form[name=search] button').click(function(event) {
    event.preventDefault();
    search();
    console.log("form submitted");
  });

  function processPlacesResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        createMarker(result);
      }
    }
  };

 


    
  return {
    init: initMap,
    createMarker: createMarker
  };

}());
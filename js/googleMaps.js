//=========================================================================================================//

//---------------------------------------------Google Maps-------------------------------------------------//

//=========================================================================================================//

var GoogleMapApi = (function(options) {

    var map, infoWindow;
    var markers = [];

    function initMap() {
        var centerPoint = {
            lat: 32.7799072,
            lng: -79.9337208
        };

        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById('map'), {
            center: centerPoint,
            zoom: 13
        });
    };

   
    function createMarker(result, info) {
        var marker = new google.maps.Marker({
            position: result.geometry.location,
            map: map,
            animation: google.maps.Animation.DROP
        });
        
        google.maps.event.addListener(marker, 'click', function() {

            GooglePlacesApi.search({
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng
            });


            setInfoWindowContent(info);
            infowindow.open(map, this);
        });
        markers.push(marker);
    };


    
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    
    function clearMarkers() {
        setMapOnAll(null);
    }

    
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function setInfoWindowContent(info) {
        var contentString = ``;

        // if (info.title) contentString += `<h3 class="marker-title">${info.title}<h3>`;
        // if (info.date) contentString += `<p class="show-date">${info.date}</p>`;
        // if (info.link && info.link_img) contentString += `<a href="${info.link}" target="_blank" class="link"><img src="${info.link_img}"></a>`;
        // if (info.other) contentString += `<div class="other">${info.description}</div>`;

        // infowindow.setContent(contentString);
    };

    return {
        init: initMap,
        setMapOnAll: setMapOnAll,
        createMarker: createMarker,
        deleteMarkers: deleteMarkers
    };

}());
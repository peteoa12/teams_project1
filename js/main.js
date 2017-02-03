var getExtraPlaceData = function() {

	places.forEach(function(place) {
		var gid = place.google_id;
		GoogleMapApi.getPlaceById(gid, function( data ) {
			// console.log("google api replied with", data, place);
			place.google_data = data;
			addPlaceToDom(place, data);
		});
	})
}

var addPlaceToDom = function( place, data ) {
	console.log(data);

	place.$element = $(
	'<li class="result cafe"><img class="result_img" src="https://pbs.twimg.com/profile_images/608377553808703489/2gBSCjiq.jpg"><div class="result_copy"><span class="rating">'+data.rating+'</span><h2 class="result_title">'+data.name+'</h2><address class="result_address">'+data.formatted_address+'</address></div></li>')

	$(".results_list").append(place.$element); //reference to the data structure.

}

function eventListeners(){
  hideShow();
}

function hideShow(){

	$(".icon").on('click', function(event) {
		var placeType = $(this).data('place-type')
		console.log("placeType", placeType);
		
		places.forEach(function(place) {
			if (!place.google_data) return;
			if (place.placeType == placeType) {
				// show this item in the list and on the map
				console.log("show", place)
				$(place.$element).show();
				GoogleMapApi.showPin(place.google_data.marker);
			} else {
				// hide this item in list and on map
				console.log("hide", place);
				$(place.$element).hide();
				GoogleMapApi.hidePin(place.google_data.marker);
			}
		})
		 
	});
}



var init = function() {
	GoogleMapApi.init();
	getExtraPlaceData();
	eventListeners();
}

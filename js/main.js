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

	// if(data.rating == 'undefined'){$('.rating').append('no rating');}
	place.$element = $(
	'<li class="result cafe"><img class="result_img" src="https://pbs.twimg.com/profile_images/608377553808703489/2gBSCjiq.jpg"><div class="result_copy"><span class="rating">'+data.rating+'</span><h2 class="result_title">'+data.name+'</h2><address class="result_address">'+data.formatted_address+'</address></div></li>')

	$(".results_list").append(place.$element); //reference to the data structure.

}

function eventListeners(){
  hideShow();
}

function hideShow(){

	// ICON LINK<><><><><><><><><><><><><><><><><><><><>

	$(".icon_link").on('click', function(event) {
		var place = $(this).data('place')
		console.log(place);

	//HIDE AND SHOW<><><><><><><><><><><><><><><><><><>
		
		if(!$(".icon_" + place)){
			$(this).hide();
		}else{
			$(this).show();
		}
		 
	});
}



var init = function() {
	GoogleMapApi.init();
	getExtraPlaceData();
	eventListeners();
}

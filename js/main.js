var getExtraPlaceData = function() {

	places.forEach(function(place) {
		var gid = place.google_id;
		GoogleMapApi.getPlaceById(gid, function( data ) {
			place.google_data = data;
			addPlaceToDom(place, data);
		
		});
	})
}

var addPlaceToDom = function( place, data, photo ) {
	console.log(data);

	place.$element = $(
	`<li class="result">
                        <div class="result_title">
                            <h2>${data.name}<span>- Charleston, SC (US)</span></h2>
                        </div>
                        <img class="result_img" src="https://pbs.twimg.com/profile_images/608377553808703489/2gBSCjiq.jpg">
                        <div class="result_content">
                            <div class="rating_container">
                                <div class="rating">${data.rating}</div>
                           
                                <div id="stars_container">
                                    <div id="starsBar">
                                        
                                    </div>
                                </div>

                                <span class="price">$$$</span>
                            </div>
              
                            <div class="interactive">
	                            <a class="result_icon" href="#"><i class="fa fa-star fa-lg result_icon" aria-hidden="true" title="Favorite"></br><span>Favorite</span></i></a>
	                            <a class="result_icon" href="${data.website}"><i class="fa fa-globe fa-lg result_icon" aria-hidden="true" title="Website"></br><span>Website</span></i></a>
	                            <a class="result_icon" href="tel:${place.formatted_phone_number}"><i class="fa fa-phone fa-lg result_icon" aria-hidden="true" title="Contact"></br><span>Contact</span></i></a>
	                            <a class="result_icon" href=http://www.facebook.com><i class="fa fa-share-alt fa-lg result_icon" aria-hidden="true" title="Share"></br><span>Share</span></i></a>
                            </div>
                             
                            <div class="review_container">
                                <h6 class="user_title">Host Description</h6>
                                <p class="reveiw">Lorem ipsum dolor sit amet, consectetur adipisicing elit!</p>
                            </div>
                            <div class="cta">
                            	<div class="directions">
                            		<span></span>
                            	</div>
                            	<div class="uber"></div>
                            </div>
                        </div>
                    </li>`)
	$(".results_list").append(place.$element); 

	starRating(place, data);
}

function starRating(place, data){
	var starWidth = data.rating * 20;
	console.log(starWidth);
	$(place.$element).find("#starsBar").css("width", starWidth + "%");
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
				// console.log("show", place)
				$(place.$element).show();
				GoogleMapApi.showPin(place.google_data.marker);
			} else {
				// console.log("hide", place);
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

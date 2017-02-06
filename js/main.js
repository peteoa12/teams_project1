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
                            		<span>Get Directions</span>
                            	</div>
                            	<div class="uber">
	                            	<a  href="https://m.uber.com/ul/?client_id=SaBTN4Tn_n9tn1NTGy9OxR9fP2ii67YF&action=setPickup&pickup[latitude]=37.775818&pickup[longitude]=-122.418028&pickup[nickname]=UberHQ&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=37.802374&dropoff[longitude]=-122.405818&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383">
	                            		<img class="uber_icon" src="assets/img/uber-icon.png">
	                            		<h6>Call Uber</h6>
	                            	</a>
                            	</div>
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

var GoogleDirectionsApi = (function(){

	function setUpSearch(data) {
		
		var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyDdjYkP3rGKMBl3m6N6qfT4F7FWUQCr-Yk';
		$.ajax({
			url: url,
			method: 'GET',
			dataType: 'json'
		    }).done(function(data) {
		        console.log("success", data);
		    }).fail(function(jqXHR, textStatus, errorThrown) {
		        console.log(jqXHR, textStatus, errorThrown)
		    })
	}
	setUpSearch();

}());
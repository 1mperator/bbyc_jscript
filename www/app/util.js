define(function () {	
	
	// A Utility Function that hides and Shows the Modal
	var toggleVisibility = function (element, clearContent) { 		
		
		if(!element) return "Element has not been provided";

		var visibility = element.style.visibility;            

		if ( typeof visibility === 'undefined' || visibility == "visible") {
			element.style.visibility = "hidden";		
			if (clearContent) document.getElementById('modal-content').innerHTML = '';			
		} else {
			element.style.visibility = "visible";
		}
	};

	return {
		toggleVisibility: toggleVisibility
	};

});
define(function () {	
	
	// A Utility Function that hides and Shows the Modal
	var toggleModal = function () { 
		var modal = document.getElementById('modal'),
		visibility = modal.style.visibility;            

		if (visibility === null || visibility === "visible" ) {           
			modal.style.visibility = "hidden";
			var modalContent = document.getElementById('modal-content');
			modalContent.innerHTML = '';
		} else {
			modal.style.visibility = "visible";
		}
	};

	return {
		toggleModal: toggleModal
	}

});
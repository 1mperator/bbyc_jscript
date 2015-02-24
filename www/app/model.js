define(['app/mediator'], function (Mediator) {

	// ------------------ BEGIN MODELS -----------------------  	
	// Creation of the Models like the views are Object Oriented to ensure quick creation and modification of them.
	
	function Model (route, listener, publisher) {
		this.route = route;
		this.listener = listener;
		this.publisher = publisher;             
		this.data = '';     
		var scope = this;

		Mediator.subscribe(listener, function (arg) {
			scope.getData(arg)
		}); 

		//if(route != App.PROD_URI) 
			this.getData();     
	};		

	Model.prototype = {     		
		getData: function (data) {
			var scope = this;           
			var modRoute = (data) ? this.route + data : this.route;			
			this.getJSONP(modRoute, function (response) {
				scope.publishData(response);				
			});
		},
		publishData: function (data) {
			Mediator.publish(this.publisher, data);
		},
		getJSONP: function (url, cb) { 
			//url (without "callback=" parameter!) and callback function
			var script = document.createElement('script');
			script.async = true;
			var callb = 'exec'+Math.floor((Math.random()*65535)+1);
			window[callb] = function(data) {
				var scr = document.getElementById(callb);
				scr.parentNode.removeChild(scr);
				cb(data);
				window[callb] = null;
				delete window[callb];
			}
			var sepchar = (url.indexOf('?') > -1)?'&':'?';
			script.src = url+sepchar+'callback='+callb;
			script.id = callb;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};  

	return (Model);

});
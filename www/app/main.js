define(function (require) {

	var Handlebars = require('handlebars-v3.0.0');

	var App = ( function() {

		var BASE_API_URI = 'http://www.bestbuy.ca/api/v2/json/',
		DEPT_URI = BASE_API_URI + 'category/Departments',
		PROD_LIST_URI = BASE_API_URI + 'search?categoryid=',
		PROD_URI = BASE_API_URI + 'product/';					

		var Templates = require('./templates');
		var Mediator = (function(){
			
			var subscribe = function (channel, fn) {
				if (!App.Mediator.channels[channel]) App.Mediator.channels[channel] = [];
				App.Mediator.channels[channel].push({ context: this, callback: fn});
				return this;
			},

			publish = function (channel) {

				if (!App.Mediator.channels[channel]) return false;			
				var args = Array.prototype.slice.call(arguments, 1);			
				for (var i = 0, len = App.Mediator.channels[channel].length; i < len; i++) {
					var subscription = App.Mediator.channels[channel][i];
					subscription.callback.apply(subscription.context, args);
				}

				return this;
			};

			return {
				channels: {},
				publish: publish,
				subscribe: subscribe,
				installTo: function(obj) {
					obj.subscribe = subscribe;
					obj.publish = publish;
				}
			}
		})();


		return {
			DEPT_URI: DEPT_URI,
			Templates: Templates,
			Mediator: Mediator,
			PROD_LIST_URI: PROD_LIST_URI,
			PROD_URI: PROD_URI,			
		};	

	})();	
	// ------------------ BEGIN MODELS -----------------------
	App.Models = {};	

	App.Model = function (route, listener, publisher) {
		this.route = route;
		this.listener = listener;
		this.publisher = publisher;				
		this.data = '';		
		var scope = this;

		App.Mediator.subscribe(listener, function (arg) {
			scope.getData(arg)
		});	

		if(route != App.PROD_URI) 
			this.getData();		
	};

	App.Model.prototype = {		
		constructor: App.Model,		
		getData: function (data) {
			var scope = this;			
			var modRoute = (data) ? this.route + data : this.route;
			
			this.getJSONP(modRoute, function (response) {
				scope.publishData(response);
			});
		},
		publishData: function (data) {
			App.Mediator.publish(this.publisher, data);
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

	// ------------------------------- BEGIN VIEWS ---------------------------
	
	App.Views = {};

	/**
	 * View Constructor Function	 
	 */
	 App.View = function (template, container, listener) {
	 	this.template = template;
	 	this.container = container;				
	 	this.listener = listener;	
	 	this.data = '';		
	 	var scope = this;
	 	App.Mediator.subscribe(listener, function (arg) {
	 		scope.data = arg;
	 		scope.render();
	 	});

	 };

	 App.View.prototype = {
	 	constructor: App.View,			 	
	 	render: function () {
	 		var compiledTemplate = Handlebars.compile(this.template),
	 		populatedTemplate = compiledTemplate(this.data);
	 		console.log(this.data);
	 		document.getElementById(this.container).innerHTML = populatedTemplate;
	 	}
	 };

	 App.Models.productListing = new App.Model(
	 	App.DEPT_URI,
	 	'',
	 	'departmentUpdate'
	 );

	 App.Models.productListing = new App.Model(
	 	App.PROD_LIST_URI,
	 	'prodListUpdate',
	 	'prodListChanged'
	 );

	 App.Models.productDetailView = new App.Model(
	 	App.PROD_URI,
	 	'detailUpdate',
	 	'detailChange'
	 );

	 App.Views.departmentView = new App.View(
	 	App.Templates.navlist, 
	 	'nav-placeholder',
	 	'departmentUpdate'		
	 );

	 App.Views.productListView = new App.View(
	 	App.Templates.productlist,
	 	'product-container',
	 	'prodListChanged'
	 );	

	 App.Views.productDetailView = new App.View(
	 	App.Templates.productdetails,
	 	'modal-content',
	 	'detailChange'
	 );		

	 App.Util = (function () {
	 	
	 	var toggleModal = function () { 
	 		var modal = document.getElementById('modal'),
	 		visibility = modal.style.visibility;	 		

	 		if (visibility == null || visibility == "visible" ) { 	 		
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
	 })();


	 document.getElementById('nav-placeholder').addEventListener("click", function (ev) {
	 	if (ev.target && ev.target.nodeName == "BUTTON") {
	 		id = ev.target.getAttribute("data-id");
	 		App.Mediator.publish('prodListUpdate', id);	 		
	 	}
	 });

	 document.getElementById('modal').addEventListener("click", function (ev) {
	 	if (ev.target.id == "modal-close" || ev.target.classList.contains('glyphicon-remove') || ev.target.id == "modal") {
	 		App.Util.toggleModal();
	 	}
	 });

	 document.getElementById('product-container').addEventListener("click", 
	 	function(ev) {	 			 		
	 		
	 		if (ev.target && (ev.target.nodeName == "DIV" || ev.target.parentNode.classList.contains('product')) ) {
	 		
	 			var sku = ev.target.getAttribute("data-id");
	 		
	 			if (sku == undefined) {
	 				sku = ev.target.parentElement.getAttribute('data-id');
	 			}
	 			
	 			App.Mediator.publish('detailUpdate', sku);	 			
	 			App.Util.toggleModal();
	 		}
	 	});
	console.log(App.Templates.productwait);	 	
	});


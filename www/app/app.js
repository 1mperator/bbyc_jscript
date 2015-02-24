requirejs.config({
	baseUrl: 'app',
	paths: {
		handlebars: '../lib/handlebars-v3.0.0',
		app: './'		
	},
	shim: {
		handlebars: {
			exports: 'handlebars'
		},		
	}
});

require(['handlebars', './constants', './templates', './mediator', './model', './view', './util'], function (Handlebars, Constants, Templates, Mediator, Model, View, Util) {
	
	var Handlebars = require('handlebars');
	
	// Creating Models	 
	var Models = {
	 	productListing: new Model(
	 		Constants.DEPT_URI,
	 		'',
	 		'departmentUpdate'
	 		),

	 	productListing: new Model(
	 		Constants.PROD_LIST_URI,
	 		'prodListUpdate',
	 		'prodListChanged'
	 		),

	 	productDetailView: new Model(
	 		Constants.PROD_URI,
	 		'detailUpdate',
	 		'detailChange'
	 		)
	};

	// Creating Views
	var Views = {
	 	departmentView: new View(
	 		Templates.navlist, 
	 		'nav-placeholder',
	 		'departmentUpdate'      
	 		),

	 	productListView: new View(
	 		Templates.productlist,
	 		'product-container',
	 		'prodListChanged'
	 		),

	 	productDetailView: new View(
	 		Templates.productdetails,
	 		'modal-content',
	 		'detailChange'
	 		)     	 
	 };

	// Controllers Section
	var navMenu = Views.departmentView.container;
	var productListing = Views.productListView.container;
	var modal = document.getElementById('modal');
	 
	// Honestly this part is a mess - I would like to move the Event Listener creation into an object and reference these controllers.
	navMenu.addEventListener("click", function (ev) {	 	
	 	if (ev.target && ev.target.nodeName === "BUTTON") {
	 		id = ev.target.getAttribute("data-id");
	 		var blah = Mediator.publish('prodListUpdate', id);         		
	 	}
	});

	modal.addEventListener("click", function (ev) {
	 	if (ev.target.id === "modal-close" || ev.target.classList.contains('glyphicon-remove') || ev.target.id === "modal") {
	 		Util.toggleVisibility(modal, true);
	 	}
	});

	productListing.addEventListener("click", 
	 	function(ev) {                      			
	 		if (ev.target && (ev.target.nodeName == "DIV" || ev.target.parentNode.classList.contains('product')) ) {

	 			var sku = ev.target.getAttribute("data-id");

	 			if (sku == undefined) {
	 				sku = ev.target.parentElement.getAttribute('data-id');
	 			}

	 			Mediator.publish('detailUpdate', sku);              
	 			Util.toggleVisibility(modal);
	 		}
		}
	);

});
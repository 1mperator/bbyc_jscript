define(function (require) {

	var Handlebars = require('handlebars');

	var App = ( function() {		                    

		var CONST = require('./constants');

		var Models = {};
		var Views = {};
		
		// Include Templates from External File
		var Templates = require('./templates');
		// Mediator to handle messaging between items		
		var Mediator = require('./mediator');
		// Model 	
		var Model = require('./model');
		// View
		var View = require('./view');

		var Util = require('./util');
	
		return {
			DEPT_URI: CONST.DEPT_URI,
			Templates: Templates,
			Models: Models,
			Model: Model,
			View: View,
			Views: Views,
			Mediator: Mediator,
			PROD_LIST_URI: CONST.PROD_LIST_URI,
			PROD_URI: CONST.PROD_URI,      
			Util: Util   
		};  
	})();   	

	 // Creating Models
	 // Note: I would want to make a more robust messaging system where I don't have to explicitly name the subscriptions they need to modify - or at very least happen a little more 'automagically'

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

	 // Creating Views

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

	 // Controllers Section

	 // Honestly this part is a mess - I would like to move the Event Listener creation into an object and reference these controllers.
	 document.getElementById('nav-placeholder').addEventListener("click", function (ev) {
		if (ev.target && ev.target.nodeName === "BUTTON") {
			id = ev.target.getAttribute("data-id");
			App.Mediator.publish('prodListUpdate', id);         
		}
	 });

	 document.getElementById('modal').addEventListener("click", function (ev) {
		if (ev.target.id === "modal-close" || ev.target.classList.contains('glyphicon-remove') || ev.target.id === "modal") {
			App.Util.toggleModal();
		}
	 });

	 document.getElementById('product-container').addEventListener("click", 
		function(ev) {                      
			
			if (ev.target && (ev.target.nodeName === "DIV" || ev.target.parentNode.classList.contains('product')) ) {
			
				var sku = ev.target.getAttribute("data-id");
			
				if (sku === undefined) {
					sku = ev.target.parentElement.getAttribute('data-id');
				}
				
				App.Mediator.publish('detailUpdate', sku);              
				App.Util.toggleModal();
			}
		});
	
	});


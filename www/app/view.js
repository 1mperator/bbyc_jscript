define(['app/mediator', 'handlebars'], function (Mediator, Handlebars) {
	// ---------------------------- BEGIN VIEWS ---------------------------  
	/**
	 * View Constructor Function     
	 * I implemented both Views and Models as Objects with prototypal inheritance to make construction of each other easier.
	 */
	 function View (template, container, listener) {
		
		this.template = Handlebars.compile(template);
		this.container = document.getElementById(container);            
		this.listener = listener;   
		this.data = '';     
		var scope = this;
		
		Mediator.subscribe(listener, function (arg) {			
			scope.data = arg;
			scope.render();
		});

	 };

	 View.prototype = {		
		render: function () {			
			var populatedTemplate = this.template(this.data);            
			this.container.innerHTML = populatedTemplate;
		}
	 };
	 return(View);
});
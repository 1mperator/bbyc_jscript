requirejs.config({
	baseUrl: 'lib',
	paths: {
		handlebars: 'handlebars-v3.0.0',
		app: '../app'
	}
});

requirejs(['app/main']);
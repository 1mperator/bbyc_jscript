define(function () {
	var navlist = [
		'{{#each subCategories}}',
		'<li><button type="button" data-id="{{id}}" class="cat-btn btn btn-default">{{name}}</li>',
		'{{/each}}'
	].join('\n'),

	productlist = [
		'{{#each products}}',
		'<div class="product" data-id="{{sku}}">',
		'<img src="http://www.bestbuy.ca{{thumbnailImage}}" class="product-image" />',
		'<span class="product-title">{{name}}</span>',
		'</div>',
		'{{/each}}'
	].join('\n'),

	productdetails = [
		'<p>{{shortDescription}}</p>'
	].join('\n');

	return {
		navlist: navlist,
		productlist: productlist,
		productdetails: productdetails
	};
});
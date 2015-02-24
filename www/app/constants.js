define(function () {	
	// Globals for API End Points
	var BASE_API_URI = 'http://www.bestbuy.ca/api/v2/json/';
	var DEPT_URI = BASE_API_URI + 'category/Departments';
	var PROD_LIST_URI = BASE_API_URI + 'search?categoryid=';
	var PROD_URI = BASE_API_URI + 'product/';       

	return {
		BASE_API_URI: BASE_API_URI,
		DEPT_URI: DEPT_URI,
		PROD_LIST_URI: PROD_LIST_URI,
		PROD_URI: PROD_URI
	}

});
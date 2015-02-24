define(['app/model'], function(Model) {
	'use strict';
	
	describe("Model", function () {
		var fakeObj = new Model('test', 'listen', 'publish');

		beforeEach(function() { 
			spyOn(fakeObj, "getJSONP").and.callThrough();
			spyOn(fakeObj, "publishData").and.callThrough();
			fakeObj.publishData("test");
		});

		it("initializes the variables", function () {

		});

		it("calls the Publish Method", function () {						
			expect(fakeObj.publishData).toHaveBeenCalledWith("test");
		});
	});

});
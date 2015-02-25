define(['app/model'], function(Model) {
	'use strict';
	
	describe("Model", function () {

		var fakeObj = new Model('test', 'listen', 'publish');

		beforeEach(function() { 
			spyOn(fakeObj, "publishData").and.callThrough();			
			fakeObj.publishData("test");
		});

		it("initializes the variables", function () {
			expect(fakeObj.route).toBe('test');
			expect(fakeObj.listener).toBe('listen');
			expect(fakeObj.publisher).toBe('publish');
		});

		it("calls the Publish Method", function () {						
			expect(fakeObj.publishData).toHaveBeenCalledWith("test");	
		});
	});

});
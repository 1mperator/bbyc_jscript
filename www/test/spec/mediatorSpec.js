define(['app/mediator'], function(Mediator) {
	'use strict';
	
	describe("Mediator", function () {

		beforeEach(function() { 
			var foo = function () {};
			var bar = "channelName";

			spyOn(Mediator, "publish").and.callThrough();
			Mediator.publish(bar);

			spyOn(Mediator, "subscribe").and.callThrough();
			Mediator.subscribe(bar, foo)

			spyOn(Mediator, "installTo").and.callThrough();			
			var obj = {};

			Mediator.installTo(obj);


		});

		it("calls the Publish Method", function () {						
			expect(Mediator.publish).toHaveBeenCalled();	
			//expect(channels).toContain('channelName');
		});

		it("calls the Subscribe Method", function () {						
			expect(Mediator.subscribe).toHaveBeenCalled();
		});

		it("calls the installTo on an object", function () {
			expect(Mediator.installTo).toHaveBeenCalled();			
		});
		
	});

});
define(function () {		

	channels = {};
	// Listen for a Publication from the Mediator Service
	function subscribe (channel, fn) {
		if (!channels[channel]) {
			channels[channel] = [];
		}
		channels[channel].push({context: this, callback: fn});
		
		return channels[channel];
	};

	// Publish information to a certain channel
	function publish (channel) {		
		if (!channels[channel]) { return false };  
		var args = Array.prototype.slice.call(arguments, 1);            
		for (var i = 0, len = channels[channel].length; i < len; i++) {
			var subscription = channels[channel][i];
			subscription.callback.apply(subscription.context, args);
		}		
		
		return channels[channel];
	};

	return {
		channels: channels,
		publish: publish,
		subscribe: subscribe,
		installTo: function(obj) {
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	};
});
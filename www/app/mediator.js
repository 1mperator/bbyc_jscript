define(
	function () {	
	
	// Listen for a Publication from the Mediator Service
	function subscribe (channel, fn) {
		if (!this.channels[channel]) {
			this.channels[channel] = [];
		}
		this.channels[channel].push({ context: this, callback: fn});
		return this;
	};

	// Publish information to a certain channel
	function publish (channel) {

		if (!this.channels[channel]) { return false };  
		var args = Array.prototype.slice.call(arguments, 1);            
		for (var i = 0, len = this.channels[channel].length; i < len; i++) {
			var subscription = this.channels[channel][i];
			subscription.callback.apply(subscription.context, args);
		}

		return this;
	};

	return {
		channels: {},
		publish: publish,
		subscribe: subscribe,
		installTo: function(obj) {
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	}
});
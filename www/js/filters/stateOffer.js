
define(['./module'], function(filters) {
	filters.filter('stateOffer', function() {
		return function(item){
			switch(item) {
				case '报价': return false; break;
				default: return true; break;
			}
		}
	});
}); 
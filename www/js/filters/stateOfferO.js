
define(['./module'], function(filters) {
	filters.filter('stateOfferO', function() {
		return function(item){
			switch(item) {
				case '报价': return true; break;
				default: return false; break;
			}
		}
	});
}); 
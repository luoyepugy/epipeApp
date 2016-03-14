
define(['./module'], function(filters) {
	filters.filter('statePayed', function() {
		return function(item){
			switch(item) {
				case '待支付': return true; break;
				default: return false; break;
			}
		}
	});
}); 
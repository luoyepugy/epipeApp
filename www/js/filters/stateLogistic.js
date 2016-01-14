
define(['./module'], function(filters) {
	filters.filter('stateLo', function() {
		return function(item){
			switch(item) {
				case '报价': return false; break;
				case '待支付': return false; break;
				case '已支付': return false; break;
				default: return true; break;
			}
		}
	});
}); 
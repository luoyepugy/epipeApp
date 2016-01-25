
define(['./list.module'], function(list) {
	list.filter('logisticsShow', function() {
		return function(item){
			switch(item) {
				case '报价': return false;
				case '待支付': return false;
				case '已支付': return false;
				default: return true;
			}
		}
	});
}); 
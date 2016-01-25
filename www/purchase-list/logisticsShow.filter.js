
define(['./list.module'], function(list) {
	list.filter('logisticsShow', function() {
		return function(item){
			switch(item) {
				case '报价': return false; break;
				default: return true; break;
			}
		}
	});
}); 
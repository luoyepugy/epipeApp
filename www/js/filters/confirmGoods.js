
define(['./module'], function(filters) {
	filters.filter('confirmGoods', function() {
		return function(item){
			switch(item) {
				case '已发货': return true; break;
				default: return false; break;
			}
		}
	});
}); 
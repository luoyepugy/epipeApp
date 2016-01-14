
define(['./module'], function(filters) {
	filters.filter('completeGoods', function() {
		return function(item){
			switch(item) {
				case '已完成': return false; break;
				default: return true; break;
			}
		}
	});
}); 
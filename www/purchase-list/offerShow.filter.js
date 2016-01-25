
define(['./list.module'], function(list) {
	list.filter('offerShow', function() {
		return function(item){
			switch(item) {
				case '报价': return true; break;
				default: return false; break;
			}
		}
	});
}); 
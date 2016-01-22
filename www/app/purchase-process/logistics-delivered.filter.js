
define(['./process.module'], function(process) {
	process.filter('deliveredFilter', function() {
		return function(item){
			switch(item) {
				case '已发货': return true; break;
				default: return false; break;
			}
		}
	});
}); 
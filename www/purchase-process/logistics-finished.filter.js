
define(['./process.module'], function(process) {
	process.filter('finishedFilter', function() {
		return function(item){
			switch(item) {
				case '已完成': return false; break;
				default: return true; break;
			}
		}
	});
}); 
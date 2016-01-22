
define(['./process.module'], function(process) {
	process.filter('payingFilter', function() {
		return function(item){
			switch(item) {
				case '待支付': return true; break;
				default: return false; break;
			}
		}
	});
}); 

define(['./others.module'], function(others) {
	
	var value = {
		'host': 'http://192.168.1.154:8083'
	};
	return others.constant('config', value);
});
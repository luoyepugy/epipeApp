
define(['./app'], function(app) {
	
	var value = {
		'host': 'http://192.168.1.154:8083'
	};
	value.avatar = value.host + '/public/avatar/';
	value.upload = value.host + '/upload';

	return app.constant('config', value);
});
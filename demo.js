angular.module('demoApp', []).controller('uiDemo', function($scope, $http) {
	var demo = this;
	
	$scope.safeApply = function(fn) {
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};
	
	var getEndpointUrl = function(path) {
		return 'https://task-api-server.herokuapp.com'+path;
	}
	
	// Generate a random string
	var rnd = function(n) {
		return Math.random().toString(36).substring(2, 2+n)
	}
	
	// Allow use from angular
	demo._isFunction	= _.isFunction;
	
	// Executed when the user click the "Execute" button
	demo.apicall = function(item) {
		var params;
		if (_.isFunction(item.params)) {
			params = item.params();
		} else {
			params = item.params;
		}
		$.ajax({
			url:		item.endpoint,
			dataType:	"jsonp",
			data:		params,
			success: function(response) {
				console.log("response",response);
				$scope.safeApply(function() {
					item.response = response;
					if (item.callback) {
						item.callback(response);
					}
				});
			}
		});
	}
	
	// Contains the temporary data for the authentication calls
	demo.authBuffer = {
		email:		rnd(5)+'@gmail.com',
		password:	rnd(8)
	}
	
	// Contains the temporary data for the task calls
	demo.taskBuffer = {
		
	}
	
	demo.calls = [{
		endpoint:	getEndpointUrl('/api/auth/register'),
		params: {
			email:		demo.authBuffer.email,
			password:	demo.authBuffer.password
		},
		allowed:	function() {
			return demo.authBuffer.email && demo.authBuffer.password;
		},
		callback:	function(response) {
			$scope.safeApply(function() {
				demo.authBuffer = _.extend(demo.authBuffer, response);
			});
		}
	}, {
		endpoint:	getEndpointUrl('/api/auth/login'),
		params: {
			email:		demo.authBuffer.email,
			password:	demo.authBuffer.password
		},
		allowed:	function() {
			return demo.authBuffer.email && demo.authBuffer.password;
		},
		callback:	function(response) {
			$scope.safeApply(function() {
				demo.authBuffer = _.extend(demo.authBuffer, response);
			});
		}
	}, {
		endpoint:	getEndpointUrl('/api/auth/save'),
		params: function() {
			return {
				uid:		demo.authBuffer.uid,
				token:		demo.authBuffer.token,
				data: {
					name:	'Hello World'
				}
			}
		},
		allowed:	function() {
			return demo.authBuffer.uid && demo.authBuffer.token;
		},
		callback:	function(response) {
			
		}
	}, {
		endpoint:	getEndpointUrl('/api/task/create'),
		params: function() {
			return {
				uid:		demo.authBuffer.uid,
				token:		demo.authBuffer.token,
				data: {
					title:	"Hello world test task",
					text:	'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
					status:	'pending'
				}
			}
		},
		allowed:	function() {
			return demo.authBuffer.uid && demo.authBuffer.token;
		},
		callback:	function(response) {
			$scope.safeApply(function() {
				demo.taskBuffer = _.extend(demo.taskBuffer, response);
			});
		}
	}, {
		endpoint:	getEndpointUrl('/api/task/list'),
		params: function() {
			return {
				uid:		demo.authBuffer.uid,
				token:		demo.authBuffer.token
			}
		},
		allowed:	function() {
			return demo.authBuffer.uid && demo.authBuffer.token;
		},
		callback:	function(response) {
			
		}
	}, {
		endpoint:	getEndpointUrl('/api/task/update'),
		params: function() {
			return {
				uid:		demo.authBuffer.uid,
				token:		demo.authBuffer.token,
				id:			demo.taskBuffer.id,
				data: {
					status: 'completed'
				}
			}
		},
		allowed:	function() {
			return demo.authBuffer.uid && demo.authBuffer.token && demo.taskBuffer.id;
		},
		callback:	function(response) {
			
		}
	}, {
		endpoint:	getEndpointUrl('/api/task/get'),
		params: function() {
			return {
				uid:		demo.authBuffer.uid,
				token:		demo.authBuffer.token,
				id:			demo.taskBuffer.id
			}
		},
		allowed:	function() {
			return demo.authBuffer.uid && demo.authBuffer.token && demo.taskBuffer.id;
		},
		callback:	function(response) {
			
		}
	}, {
		endpoint:	getEndpointUrl('/api/task/remove'),
		params: function() {
			return {
				uid:		demo.authBuffer.uid,
				token:		demo.authBuffer.token,
				id:			demo.taskBuffer.id
			}
		},
		allowed:	function() {
			return demo.authBuffer.uid && demo.authBuffer.token && demo.taskBuffer.id;
		},
		callback:	function(response) {
			$scope.safeApply(function() {
				delete demo.taskBuffer.id;
			});
		}
	}];
	
	
	
});


var map = {};
var defaultHandlers = [];

var addRoute = function(path, handlers) {
	map[path] = handlers;
};

var setDefaultHandlers = function(handlers) {
	defaultHandlers = handlers;
};

var route = function(req, res, pathname) {

	if(pathname.charAt(pathname.length - 1) === "/") {
		pathname = pathname.substring(0, pathname.length - 1);
	}
	
	var handlers = defaultHandlers;
	
	for(var path in map) {
		if(pathname === path || pathname.substring(0, pathname.lastIndexOf("/")) === path) {
			handlers = map[path];
			break;
		}
	}
	
	var handle = function(index) {
		
		var next = function recur() {
			handlers[++index](req, res, recur, pathname);
		};
		
		if(handlers[index]) {
			handlers[index](req, res, next, pathname);
		}
	};
	
	handle(0);
};

exports.addRoute = addRoute;
exports.setDefaultHandlers = setDefaultHandlers;
exports.route = route;
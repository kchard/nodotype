var create = function(code, message) {	var handle = function(req, res, next, pathname) {		console.log("(errorHandler) Error resolving resource for pathname: " + pathname);		res.writeHead(code, message);		res.end(message);	};		return {handle: handle};};exports.create = create;
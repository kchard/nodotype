var http = require('http');
var url = require('url');

var start = function(host, port, route) {

	var listener = function (req, res) {
	
		var pathname = url.parse(req.url).pathname;
		if(pathname === "/") {
			pathname = "/index.html";
		}
		console.log("Handling request for: " + pathname);
		
		route(req, res, pathname);
	};

	http.createServer(listener).listen(port, host);
	console.log("Server running at http://" + host + ":" + port);
};

exports.start = start;


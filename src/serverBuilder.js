var errorHandlerFactory = require("./handler/errorHandlerFactory");
var fileHandlerFactory = require("./handler/fileHandlerFactory");
var serviceHandlerFactory = require("./handler/serviceHandlerFactory");
var daoFactory = require("./dao/daoFactory");
var router = require("./router");
var server = require("./server");

var notFoundHandler = errorHandlerFactory.create(404, "Not Found");
var webFileHandler = fileHandlerFactory.create("./web");

var addService = function(path, data) {
	
	var servicePath = path || "/";
	var initialData = data || [];
	
	var dao = daoFactory.create(initialData);	
	var handler = serviceHandlerFactory.create(servicePath, dao);

	router.addRoute(handler.path, [handler.handle, notFoundHandler.handle]);
	
	return this;
};

var start = function(port) {
	var serverPort = port || 80;
	
	router.setDefaultHandlers([webFileHandler.handle, notFoundHandler.handle]);
	server.start("127.0.0.1", 80, router.route);
};

exports.addService = addService;
exports.start = start;